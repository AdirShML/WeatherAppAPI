from django.conf import settings
from .utils import WeatherUtils  # Import the utility class

class WeatherCacheService:
    API_KEY = settings.API_KEY

    @classmethod
    def get_weather_by_city(self, type, city):
        cache_key = f'{type}_{city.lower()}'
        url = f"http://api.openweathermap.org/data/2.5/{type}?q={city}&appid={self.API_KEY}&units=metric"
        return WeatherUtils.get_weather(cache_key, url, is_forecast=type == 'forecast')

    @classmethod
    def get_weather_by_coordinates(self, type, latitude, longitude):
        cache_key = f'{type}_lat_{latitude}_lon_{longitude}'
        url = f"http://api.openweathermap.org/data/2.5/{type}?lat={latitude}&lon={longitude}&appid={self.API_KEY}&units=metric"
        return WeatherUtils.get_weather(cache_key, url, is_forecast=type == 'forecast')
