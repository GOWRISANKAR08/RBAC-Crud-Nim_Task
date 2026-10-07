from django.urls import path

from .views import (
    EmployeeProfileView,
    EmployeeListCreateView,
    EmployeeDetailView,
)


urlpatterns = [

    path("profile/",EmployeeProfileView.as_view(),name="employee-profile"),

    path("",EmployeeListCreateView.as_view(),name="employee-list-create"),

    path("<int:pk>/",EmployeeDetailView.as_view(),name="employee-detail"),
]