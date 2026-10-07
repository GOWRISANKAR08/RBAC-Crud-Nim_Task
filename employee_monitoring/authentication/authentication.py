from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed

from employees.models import Employee


class EmployeeJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):

        header = self.get_header(request)

        if header is None:
            return None

        raw_token = self.get_raw_token(header)

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(
            raw_token
        )

        employee = self.get_user(validated_token)

        return (
            employee,
            validated_token
        )

    def get_user(self, validated_token):

        employee_id = validated_token.get(
            "employee_id"
        )

        if not employee_id:
            raise AuthenticationFailed(
                "Employee ID not found in token."
            )

        try:
            employee = Employee.objects.get(
                employee_id=employee_id,
                is_active=True
            )
        except Employee.DoesNotExist:
            raise AuthenticationFailed(
                "Employee not found."
            )

        return employee