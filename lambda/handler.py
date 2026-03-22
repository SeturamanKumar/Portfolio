import json
import os
import boto3
from botocore.exceptions import ClientError

ses = boto3.client('ses', region_name='ap-south-1')

def handler(event, context):
    if event.get('requestContext', {}).get('http', {}).get('method') != 'POST':
        return _response(405, {'error': 'Method not allowed'})

    try:
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return _response(400, {'error': 'Invalid Json'})

    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return _response(400, {'error': 'All fields are requireds'})

    sender = os.environ['SENDER_EMAIL']
    reciepient = os.environ['RECIPIENT_EMAIL']

    try:
        ses.send_email(
            Source=sender,
            Destination={
                'ToAddresses': [reciepient]
            },
            Message={
                'Subject': {
                    'Data': f'Portfolio Contact Form {name}'
                },
                'Body': {
                    'Text': {
                        'Data': f'Name: {name}\nEmail: {email}\n\nMessage: \n{message}'
                    },
                },
            },
            ReplyToAddresses=[email]
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
