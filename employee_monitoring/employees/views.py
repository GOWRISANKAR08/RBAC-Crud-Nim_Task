from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from roles.permissions import HasPermission
from employees.models import Employee
from employees.serializers import EmployeeSerializer

class EmployeeProfileView(APIView):
    permission_classes = [HasPermission]

    def get(self, request):
        employee = request.user
        return Response({
            "message": "Authentication successful",
            "employee_id": employee.employee_id,
            "name": employee.name,
            "email": employee.email,
            "role": employee.role.name
        })

class EmployeeListCreateView(APIView):
    permission_classes = [HasPermission]
    permission_map = {
        "GET": "employee_view",
        "POST": "employee_create",
    }

    def get(self, request):
        if request.user.role.name == "Employee":
            employees = Employee.objects.filter(id=request.user.id).order_by("-id")
        else:
            employees = Employee.objects.all().order_by("-id")

        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
        return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        
class EmployeeDetailView(APIView):
    permission_classes = [HasPermission]
    permission_map = {
        "GET": "employee_view",
        "PUT": "employee_update",
        "PATCH": "employee_update",
        "DELETE": "employee_delete",
    }

    def get_object(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
            if request.user.role.name == "Employee" and employee.id != request.user.id:
                return None
            return employee
        except Employee.DoesNotExist:
            return None

    def get(self, request, pk):
        employee = self.get_object(request, pk)
        if not employee:
            return Response({"detail": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        employee = self.get_object(request, pk)
        if not employee:
            return Response({"detail": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employee, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        employee = self.get_object(request, pk)
        if not employee:
            return Response({"detail": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        employee = self.get_object(request, pk)
        if not employee:
            return Response({"detail": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response({"message": "Employee deleted successfully."}, status=status.HTTP_204_NO_CONTENT)