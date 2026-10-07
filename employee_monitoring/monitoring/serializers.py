from rest_framework import serializers

from .models import MonitoringActivity


class MonitoringActivitySerializer(
    serializers.ModelSerializer
):

    employee_name = serializers.CharField(
        source="employee.name",
        read_only=True
    )

    employee_code = serializers.CharField(
        source="employee.employee_id",
        read_only=True
    )

    class Meta:

        model = MonitoringActivity

        fields = [
            "id",
            "employee",
            "employee_code",
            "employee_name",
            "activity_type",
            "description",
            "timestamp",
            "updated_at",
            "is_deleted",
        ]

        read_only_fields = [
            "id",
            "employee_code",
            "employee_name",
            "timestamp",
            "updated_at",
            "is_deleted",
        ]

    def validate_description(self, value):

        if value:
            value = value.strip()

        return value