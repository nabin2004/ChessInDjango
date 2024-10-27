from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User 
from django.shortcuts import render, get_object_or_404, redirect
from .forms import UserForm


@login_required
def welcome(request):
    return render(request, 'welcome.html')

def request_print(request):
    print(request)
    return render(request, 'request_print.html', {'result': request.user, 'request': request, 'is_authenticated': request.user.is_authenticated})

def please_login(request):
    return render(request, 'please_login.html')

def create_user(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()  
            return redirect('welcome')
    else:
        form = UserForm()
    
    context = {'form': form}
    return render(request, 'create_user.html', context)