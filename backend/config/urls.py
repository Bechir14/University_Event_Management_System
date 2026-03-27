from django.contrib import admin
from django.urls import path, include
from apps.users.views import UserListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/events/', include('apps.events.urls')),
    path('api/registrations/', include('apps.registrations.urls')),
    path('api/notifications/', include('apps.notifications.urls')),
    path('api/feedback/', include('apps.feedback.urls')),
    path('api/admin/users/', UserListView.as_view(), name='admin-users'),
]
