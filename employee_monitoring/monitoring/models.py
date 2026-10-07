from django.db import models

# Create your models here.
from django.db import models
from employees.models import Employee


from django.db import models
from employees.models import Employee


class MonitoringActivity(models.Model):

    ACTIVITY_TYPES = (
        ("login", "Login"),
        ("logout", "Logout"),
        ("active", "Active"),
        ("idle", "Idle"),
    )

    employee = models.ForeignKey(Employee,on_delete=models.CASCADE,related_name="monitoring_activities")

    activity_type = models.CharField(max_length=20,choices=ACTIVITY_TYPES)

    description = models.TextField(blank=True,null=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return (f"{self.employee.employee_id} - "f"{self.activity_type}")