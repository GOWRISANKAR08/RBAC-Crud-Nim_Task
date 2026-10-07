from rest_framework import serializers
from employees.models import Employee


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):

        email = attrs.get("email")
        password = attrs.get("password")

        try:
            employee = Employee.objects.get(
                email=email
            )
        except Employee.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not employee.is_active:
            raise serializers.ValidationError(
                "Employee account is inactive."
            )

        if not employee.check_password(password):
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        attrs["employee"] = employee

        return attrs