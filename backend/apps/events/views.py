from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer, EventListSerializer


class IsOrganizerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role in ('organizer', 'admin')

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user == obj.organizer or request.user.role == 'admin'


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-created_at')
    permission_classes = (IsOrganizerOrAdmin,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'description', 'location', 'category')

    def get_serializer_class(self):
        if self.action == 'list':
            return EventListSerializer
        return EventSerializer

    def get_queryset(self):
        qs = Event.objects.all().order_by('-created_at')
        status = self.request.query_params.get('status')
        category = self.request.query_params.get('category')
        if status:
            qs = qs.filter(status=status)
        if category:
            qs = qs.filter(category=category)
        return qs
