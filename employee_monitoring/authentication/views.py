from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer


class LoginView(APIView):

    permission_classes = []

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        employee = serializer.validated_data["employee"]

        refresh = RefreshToken()

        refresh["employee_id"] = employee.employee_id
        refresh["email"] = employee.email
        refresh["role"] = employee.role.name

        access_token = refresh.access_token

        access_token["employee_id"] = employee.employee_id
        access_token["email"] = employee.email
        access_token["role"] = employee.role.name

        return Response(
            {
                "message": "Login successful",
                "access_token": str(access_token),
                "refresh_token": str(refresh),
                "employee": {
                    "id": employee.id,
                    "employee_id": employee.employee_id,
                    "name": employee.name,
                    "email": employee.email,
                    "role": employee.role.name
                }
            },
            status=status.HTTP_200_OK
        )