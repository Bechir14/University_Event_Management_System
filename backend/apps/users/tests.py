from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


class UserRegistrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_student(self):
        response = self.client.post(reverse('auth-register'), {
            'username': 'teststudent',
            'email': 'student@test.com',
            'password': 'testpass123',
            'role': 'student',
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['username'], 'teststudent')
        self.assertEqual(response.data['role'], 'student')

    def test_register_organizer(self):
        response = self.client.post(reverse('auth-register'), {
            'username': 'testorganizer',
            'email': 'organizer@test.com',
            'password': 'testpass123',
            'role': 'organizer',
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['role'], 'organizer')

    def test_login_returns_jwt(self):
        User.objects.create_user(username='loginuser', password='testpass123', role='student')
        response = self.client.post(reverse('auth-login'), {
            'username': 'loginuser',
            'password': 'testpass123',
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['role'], 'student')

    def test_me_requires_auth(self):
        response = self.client.get(reverse('auth-me'))
        self.assertEqual(response.status_code, 401)

    def test_me_returns_profile(self):
        user = User.objects.create_user(username='meuser', password='testpass123', role='organizer')
        self.client.force_authenticate(user=user)
        response = self.client.get(reverse('auth-me'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'meuser')
        self.assertEqual(response.data['role'], 'organizer')
