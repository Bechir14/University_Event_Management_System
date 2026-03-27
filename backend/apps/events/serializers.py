from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    organizer_username = serializers.CharField(source='organizer.username', read_only=True)
    registered_count = serializers.IntegerField(read_only=True)
    spots_remaining = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = (
            'id', 'title', 'description', 'date', 'location',
            'category', 'capacity', 'status', 'organizer', 'organizer_username',
            'registered_count', 'spots_remaining', 'created_at'
        )
        read_only_fields = ('id', 'organizer', 'created_at')

    def create(self, validated_data):
        validated_data['organizer'] = self.context['request'].user
        return super().create(validated_data)


class EventListSerializer(serializers.ModelSerializer):
    organizer_username = serializers.CharField(source='organizer.username', read_only=True)
    registered_count = serializers.IntegerField(read_only=True)
    spots_remaining = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = (
            'id', 'title', 'date', 'location', 'category',
            'capacity', 'status', 'organizer_username',
            'registered_count', 'spots_remaining'
        )
