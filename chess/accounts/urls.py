from django.contrib import admin
from django.urls import path
from . import views 

urlpatterns = [
    path('welcome/', views.welcome),
    path('please_login/', views.please_login),
    path('request_print/', views.request_print),
    path('newuser/', views.create_user),
]