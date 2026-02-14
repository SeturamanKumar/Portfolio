import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '')
            email = data.get('email', '')
            message = data.get('message', '')

            if not name or not email or not message:
                return JsonResponse({ "error": "All fields are required" }, status=400)
            
            send_mail(
                subject=f"Portfolio Contact from {name}",
                message=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )

            return JsonResponse({ "message": "Email sent Successfully!" }, status=200)
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({ "error": "Internal Server Error "}, status=500)
        
    return JsonResponse({ "error": "Invalid request method" }, status=405)