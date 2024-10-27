from django.db import models
from django.utils import timezone



class User(models.Model):
    
    user_id = models.AutoField(primary_key=True)
    user_type = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    hashed_password = models.CharField(max_length=50)
    registrationDate = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.user_id) + " " + self.first_name + ' ' + self.lastName + ' ' + self.email + ' ' + str(self.registrationDate) + ' ' + self.user_type

    class Meta:
        db_table = 'users'

