from django.contrib import admin

from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):

    list_display = (
        "employee_id",
        "name",
        "email",
        "role",
        "department",
        "is_active",
    )

    search_fields = (
        "employee_id",
        "name",
        "email",
    )

    list_filter = (
        "role",
        "department",
        "is_active",
    )