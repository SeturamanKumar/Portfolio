import json
import os
import re
import urllib.request
import urllib.parse
import boto3
import dns.resolver
from botocore.exceptions import ClientError

# to communicate with SES to send mail
ses = boto3.client('ses', region_name='ap-south-1')

# below 0.5 token score is rejected as bot
RECAPTCHA_THRESHOLD = 0.5

# Field length
MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 2000

# Checks for email formating
EMAIL_REGEX = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

# Verifies with google reCAPTCHA V3
def _verify_recaptcha(token):
    secret = os.environ['RECAPTCHA_SECRET_KEY']

    # Made payload for captcha verification
    data = urllib.parse.urlencode({
        'secret': secret,
        'response': token,
    }).encode('utf-8')

    try:
        # Sent the token for captcha verification
        req = urllib.request.Request(
            'https://www.google.com/recaptcha/api/siteverify',
            data=data,
            method='POST'
        )

        # Checking the token verification
        with urllib.request.urlopen(req, timeout=5) as response:
            result = json.loads(response.read().decode('utf-8'))

        # Returns success for not a bot
        return result.get('success', False) and result.get('score', 0) >= RECAPTCHA_THRESHOLD
    except Exception as e:
        print(f'reCAPTCHA verification error: {e}')
        return False

# Checks email formating
def _is_valid_email_format(email):
    return bool(EMAIL_REGEX.match(email))

# Checks if the domain of the mail have mail servers or not
def _has_mx_record(email):
    try:
        domain = email.split('@')[1]
        dns.resolver.resolve(domain, 'MX')
        return True
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, dns.exception.Timeout) as e:
        print(f'MX lookup failed for {email}: {e}')
        return False
    except Exception as e:
        print(f'Unexpected MX lookup error for {email}: {e}')
        return False

# Sends the mail to me and copy to the person who submitted the form
def handler(event, context):

    # Decline non POST requests
    if event.get('requestContext', {}).get('http', {}).get('method') != 'POST':
        return _response(405, {'error': 'Method not allowed'})

    try:
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return _response(400, {'error': 'Invalid Json'})

    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()
    recaptcha_token = bode.get('recaptcha_token', '').strip()

    if not name or not email or not message or not recaptcha_token:
        return _response(400, {'error': 'All fields are requireds'})

    if len(name) > MAX_NAME_LENGTH:
        return _response(400, {'error': f'Name must be under {MAX_NAME_LENGTH} characters'})
    if len(email) > MAX_EMAIL_LENGTH:
        return _response(400, {'error': f'Email must be under {MAX_EMAIL_LENGTH} characters'})
    if len(message) > MAX_MESSAGE_LENGTH:
        return _response(400, {'error': f'Message must be under {MAX_MESSAGE_LENGTH} characters'})

    if not _verify_recaptcha(recaptcha_token):
        return _response(400, {'error': 'Bot detection failed. Please try again'})

    if not _is_valid_email_format(email):
        return _response(400, {'error': 'Invalid email address'})

    if not _has_mx_record(email):
        return _response(400, {'error': 'Email domain does not exist'})

    sender = os.environ['SENDER_EMAIL']
    recipient = os.environ['RECIPIENT_EMAIL']

    try:

        # Email 1 - Will come to me
        ses.send_email(
            Source=sender,
            Destination={
                'ToAddresses': [recipient]
            },
            Message={
                'Subject': {
                    'Data': f'New Contact Form submission from {name}'
                },
                'Body': {
                    'Text': {
                        'Data': (
                            f'Name: {name}\n'
                            f'Email: {email}\n\n'
                            f'Message: \n{message}'
                        )
                    },
                },
            },
            ReplyToAddresses=[email]
        )
        # Email 2 - A copy sent to the person who filled the form
        ses.send_email(
            Source=sender,
            Destination={
                'ToAddresses': [email]
            },
            Message={
                'Subject': {
                    'Data': 'Thanks for reaching out!'
                },
                'Body': {
                    'Text': {
                        'Data': (
                            f'Hi {name}, \n\n'
                            f'Thanks for getting in touch.'
                            f'I\'ve recieved your message and will get back to you soon.\n\n'
                            f'Here\'s a copy of what you sent:\n\n'
                            f'"{message}"'
                            f'Best,'
                            f'Seturaman Kumar'
                        )
                    }
                }
            }
        )

        return _response(200, {'message': 'Email Sent Successfully'})

    except ClientError as e:
        code = e.response['Error']['Code']
        msg = e.response['Error']['Message']
        print(f'SES error: {code}: {msg}')
        return _response(500, {'error': 'Failed to send email'})

def _response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(body),
    }
