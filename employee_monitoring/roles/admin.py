from django.contrib import admin

from .models import Role, Permission


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "code",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
        "code",
    )

    list_filter = (
        "is_active",
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )

    filter_horizontal = (
        "permissions",
    )