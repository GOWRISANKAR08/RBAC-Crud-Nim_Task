from django.db import models

# Create your models here.
from django.db import models
from roles.models import Role
from django.contrib.auth.hashers import make_password, check_password

class Employee(models.Model):

    employee_id = models.CharField(max_length=20,unique=True)

    name = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    password = models.CharField(max_length=255)

    phone = models.CharField(max_length=15,blank=True,null=True)

    department = models.CharField(max_length=100,blank=True,null=True)

    role = models.ForeignKey(Role,on_delete=models.PROTECT,related_name="employees")

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(
            raw_password,
            self.password
        )

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return f"{self.employee_id} - {self.name}"