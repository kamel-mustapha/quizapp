from django.urls import path
from .views import get_random_questions

urlpatterns = [
    path('get-random-questions/', get_random_questions, name='random-questions')
]
