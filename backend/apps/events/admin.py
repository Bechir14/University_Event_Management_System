from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'date', 'category', 'status', 'capacity')
    list_filter = ('status', 'category')
    search_fields = ('title', 'description')
