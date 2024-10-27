from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'first_name', 'lastName', 'email', 'registrationDate', 'user_type')

admin.site.register(User, UserAdmin)