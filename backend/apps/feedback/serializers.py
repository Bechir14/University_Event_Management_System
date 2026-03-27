from rest_framework import serializers
from .models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Feedback
        fields = ('id', 'user', 'username', 'event', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def validate(self, attrs):
        user = self.context['request'].user
        event = attrs.get('event')
        if Feedback.objects.filter(user=user, event=event).exists():
            raise serializers.ValidationError("You have already submitted feedback for this event.")
        return attrs
