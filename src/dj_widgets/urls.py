from django.urls import path
from . import views
app_name = "dj_widgets"

urlpatterns = [
    path('', views.index, name='index'),
]
