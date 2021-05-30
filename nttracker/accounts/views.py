import os
import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token

from accounts.models import User
from .serializers import UserSerializer


def ajax_login(request):
    if request.is_ajax():
        try:
            post_data = json.load(request)
            username = post_data['username']
            password = post_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)

            # pick appropriate data here (for user)
            userdata = {
                'authenticated': user is not None,
                'username': user.username,
                'email': user.email,
            }
            return JsonResponse(userdata)
        # be more specific on exception
        except:
            # also work on the error messages
            return JsonResponse({'authenticated': False, 'errors': {'inv_credentials': 'Invalid credentials provided'}})


def test_state(request):
    csrf_token = get_token(request)
    user_id = os.environ.get('TESTUSER_ID')

    if user_id is None:
        return JsonResponse({'user': {'username': 'guest_8000', 'id': -1, "authenticated": False}})

    user = UserSerializer(instance=User.objects.get(id=user_id)).data
    user['authenticated'] = True
    for entry in ['password']:
        user.pop(entry, None) 
        print(entry)

    return JsonResponse({'user': user, 'csrftoken': csrf_token})

