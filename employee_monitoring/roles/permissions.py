from rest_framework.permissions import BasePermission


class HasPermission(BasePermission):

    def has_permission(self, request, view):

        employee = request.user

        if not employee:
            return False

        if not employee.is_authenticated:
            return False

        if not employee.is_active:
            return False

        permission_map = getattr(
            view,
            "permission_map",
            {}
        )

        permission_code = permission_map.get(
            request.method
        )

        if not permission_code:
            return False

        return employee.role.permissions.filter(
            code=permission_code,
            is_active=True
        ).exists()