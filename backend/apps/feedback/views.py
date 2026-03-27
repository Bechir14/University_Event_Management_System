from rest_framework import generics, permissions
from apps.events.models import Event
from .models import Feedback
from .serializers import FeedbackSerializer


class SubmitFeedbackView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EventFeedbackView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        event_id = self.kwargs['event_id']
        return Feedback.objects.filter(event__id=event_id)
