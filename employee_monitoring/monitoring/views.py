from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from roles.permissions import HasPermission
from .models import MonitoringActivity
from .serializers import MonitoringActivitySerializer

class MonitoringListCreateView(APIView):
    permission_classes = [HasPermission]
    permission_map = {
        "GET": "monitoring_view",
        "POST": "monitoring_create",
    }

    def get(self, request):
        queryset = (
            MonitoringActivity.objects
            .select_related("employee")
            .filter(is_deleted=False)
        )

        if request.user.role.name == "Employee":
            queryset = queryset.filter(employee=request.user)

        queryset = queryset.order_by("-timestamp")
        serializer = MonitoringActivitySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MonitoringActivitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        activity = serializer.save()
        return Response(
            MonitoringActivitySerializer(activity).data,
            status=status.HTTP_201_CREATED
        )
        
class MonitoringDetailView(APIView):
    permission_classes = [HasPermission]
    permission_map = {
        "GET": "monitoring_view",
        "PUT": "monitoring_update",
        "PATCH": "monitoring_update",
        "DELETE": "monitoring_delete",
    }

    def get_object(self, request, pk):
        try:
            activity = MonitoringActivity.objects.select_related("employee").get(
                pk=pk,
                is_deleted=False
            )
            if request.user.role.name == "Employee" and activity.employee_id != request.user.id:
                return None
            return activity
        except MonitoringActivity.DoesNotExist:
            return None

    def get(self, request, pk):
        activity = self.get_object(request, pk)
        if not activity:
            return Response({"detail": "Monitoring record not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = MonitoringActivitySerializer(activity)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        activity = self.get_object(request, pk)
        if not activity:
            return Response({"detail": "Monitoring record not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = MonitoringActivitySerializer(activity, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        activity = self.get_object(request, pk)
        if not activity:
            return Response({"detail": "Monitoring record not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = MonitoringActivitySerializer(activity, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        activity = self.get_object(request, pk)
        if not activity:
            return Response({"detail": "Monitoring record not found."}, status=status.HTTP_404_NOT_FOUND)
        activity.is_deleted = True
        activity.save(update_fields=["is_deleted"])
        return Response({"message": "Monitoring record deleted successfully."}, status=status.HTTP_200_OK)