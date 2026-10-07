from django.urls import path

from .views import (
    MonitoringListCreateView,
    MonitoringDetailView,
)


urlpatterns = [

    path("",MonitoringListCreateView.as_view(),name="monitoring-list-create"),

    path("<int:pk>/",MonitoringDetailView.as_view(),name="monitoring-detail"),
]