from rest_framework import serializers

from .models import Employee
from roles.models import Role


class EmployeeSerializer(serializers.ModelSerializer):

    role_name = serializers.CharField(source="role.name",read_only=True)

    class Meta:
        model = Employee

        fields = [
            "id",
            "employee_id",
            "name",
            "email",
            "password",
            "phone",
            "department",
            "role",
            "role_name",
            "is_active",
            "created_at",
            "updated_at",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def validate_employee_id(self, value):

        if not value.strip():
            raise serializers.ValidationError(
                "Employee ID cannot be empty."
            )

        return value

    def validate_name(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Name cannot be empty."
            )

        if not value.replace(" ", "").isalpha():
            raise serializers.ValidationError(
                "Name must contain only letters."
            )

        return value

    def validate_email(self, value):

        return value.lower().strip()

    def validate_phone(self, value):

        if value:

            value = value.strip()

            if not value.isdigit():
                raise serializers.ValidationError(
                    "Phone number must contain only digits."
                )

            if len(value) != 10:
                raise serializers.ValidationError(
                    "Phone number must contain 10 digits."
                )

        return value

    def validate_password(self, value):

        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must contain at least 8 characters."
            )

        return value

    def create(self, validated_data):

        password = validated_data.pop("password")

        employee = Employee(**validated_data)

        employee.set_password(password)

        employee.save()

        return employee

    def update(self, instance, validated_data):

        password = validated_data.pop(
            "password",
            None
        )

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        return instance