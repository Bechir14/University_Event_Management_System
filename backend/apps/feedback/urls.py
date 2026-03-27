from django.urls import path
from .views import SubmitFeedbackView, EventFeedbackView

urlpatterns = [
    path('', SubmitFeedbackView.as_view(), name='submit-feedback'),
    path('events/<uuid:event_id>/', EventFeedbackView.as_view(), name='event-feedback'),
]
