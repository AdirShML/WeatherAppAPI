from django.urls import path
from .views import WeatherAPIView

urlpatterns = [
    path('weather/', WeatherAPIView.as_view(), name='weather_api'),  
    path('weather/coordinates/', WeatherAPIView.as_view(), name='weather_by_coord'),
    path('weather/<str:city>/', WeatherAPIView.as_view(), name='weather_by_city'),
]
