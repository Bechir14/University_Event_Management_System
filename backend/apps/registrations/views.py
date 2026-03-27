from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.events.models import Event
from apps.notifications.models import Notification
from .models import Registration
from .serializers import RegistrationSerializer


class RegisterForEventView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id, status='published')
        except Event.DoesNotExist:
            return Response({'detail': 'Event not found or not published.'}, status=status.HTTP_404_NOT_FOUND)

        if Registration.objects.filter(user=request.user, event=event).exists():
            return Response({'detail': 'Already registered for this event.'}, status=status.HTTP_400_BAD_REQUEST)

        reg_status = 'confirmed' if event.spots_remaining > 0 else 'waitlist'
        registration = Registration.objects.create(user=request.user, event=event, status=reg_status)

        Notification.objects.create(
            user=request.user,
            event=event,
            message=f'You have been {"confirmed" if reg_status == "confirmed" else "added to the waitlist"} for "{event.title}".'
        )

        return Response(RegistrationSerializer(registration).data, status=status.HTTP_201_CREATED)


class MyRegistrationsView(generics.ListAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user).select_related('event')


class CancelRegistrationView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, registration_id):
        try:
            registration = Registration.objects.get(id=registration_id, user=request.user)
        except Registration.DoesNotExist:
            return Response({'detail': 'Registration not found.'}, status=status.HTTP_404_NOT_FOUND)

        registration.status = 'cancelled'
        registration.save()
        return Response({'detail': 'Registration cancelled.'}, status=status.HTTP_200_OK)
