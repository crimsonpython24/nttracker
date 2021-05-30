from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse


@ensure_csrf_cookie
def index(request):
    return render(request, 'build/index.html', {'user': request.user.username + "test"})
    # return HttpResponse("Please access the site through port 3000")
  