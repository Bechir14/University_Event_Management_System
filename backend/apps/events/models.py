import uuid
from django.db import models
from django.conf import settings


class Event(models.Model):
    CATEGORY_CHOICES = [
        ('academic', 'Academic'),
        ('sports', 'Sports'),
        ('cultural', 'Cultural'),
        ('workshop', 'Workshop'),
        ('social', 'Social'),
        ('other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=300)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    capacity = models.PositiveIntegerField(default=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='organized_events'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def registered_count(self):
        return self.registrations.filter(status='confirmed').count()

    @property
    def spots_remaining(self):
        return self.capacity - self.registered_count
