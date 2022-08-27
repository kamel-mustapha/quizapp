from django.contrib import admin
from django.urls import path, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('^.*', index, name = 'main')
]
