
from django.db import models

class Permission(models.Model):

    name = models.CharField(max_length=100,unique=True)

    code = models.CharField(max_length=100,unique=True)

    description = models.TextField(blank=True,null=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    
    
class Role(models.Model):

    name = models.CharField(max_length=50,unique=True)
    
    description = models.TextField(blank=True,null=True)

    permissions = models.ManyToManyField(Permission,blank=True,related_name="roles"    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name