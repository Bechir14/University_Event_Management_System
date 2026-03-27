from django.urls import path
from .views import NotificationListView, MarkReadView

urlpatterns = [
    path('', NotificationListView.as_view(), name='notifications'),
    path('<uuid:notification_id>/read/', MarkReadView.as_view(), name='notification-read'),
]
