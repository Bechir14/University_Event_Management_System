from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class EventAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.organizer = User.objects.create_user(
            username='organizer1', password='testpass123', role='organizer'
        )
        self.student = User.objects.create_user(
            username='student1', password='testpass123', role='student'
        )

    def test_list_events_unauthenticated(self):
        response = self.client.get(reverse('event-list'))
        self.assertEqual(response.status_code, 200)

    def test_create_event_as_organizer(self):
        self.client.force_authenticate(user=self.organizer)
        response = self.client.post(reverse('event-list'), {
            'title': 'Test Event',
            'description': 'A test event',
            'date': timezone.now().isoformat(),
            'location': 'Main Hall',
            'category': 'academic',
            'capacity': 50,
            'status': 'published',
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['title'], 'Test Event')
        self.assertEqual(response.data['organizer_username'], 'organizer1')

    def test_create_event_as_student_forbidden(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.post(reverse('event-list'), {
            'title': 'Unauthorized Event',
            'description': 'Should fail',
            'date': timezone.now().isoformat(),
            'location': 'Nowhere',
            'category': 'other',
            'capacity': 10,
            'status': 'published',
        })
        self.assertEqual(response.status_code, 403)
