from django.urls import path
from .views import RegisterForEventView, MyRegistrationsView, CancelRegistrationView

urlpatterns = [
    path('my/', MyRegistrationsView.as_view(), name='my-registrations'),
    path('events/<uuid:event_id>/register/', RegisterForEventView.as_view(), name='register-for-event'),
    path('<uuid:registration_id>/cancel/', CancelRegistrationView.as_view(), name='cancel-registration'),
]
