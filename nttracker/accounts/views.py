import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse


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
