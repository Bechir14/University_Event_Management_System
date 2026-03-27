from rest_framework import serializers
from .models import Registration
from apps.events.serializers import EventListSerializer


class RegistrationSerializer(serializers.ModelSerializer):
    event_detail = EventListSerializer(source='event', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Registration
        fields = ('id', 'user', 'username', 'event', 'event_detail', 'status', 'registered_at')
        read_only_fields = ('id', 'user', 'status', 'registered_at')
