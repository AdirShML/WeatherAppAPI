import requests
import logging
from django.conf import settings
from django.core.cache import cache
from datetime import datetime

logger = logging.getLogger(__name__)

class WeatherUtils:
    API_KEY = settings.API_KEY

    @classmethod
    def get_weather(cls, cache_key, url, is_forecast=False):
        cached_data = cache.get(cache_key)
        if cached_data:
            logger.info(f"Returning cached data for {cache_key}")
            return cached_data

        logger.info('No cache data found, making API request...')
        response = cls._make_request(url, is_forecast)
        if response:
            cache.set(cache_key, response, timeout=settings.CACHE_TIMEOUT or 300)
            return response
        else:
            return {'error': 'Failed to fetch data from OpenWeatherMap'}

    @staticmethod
    def _make_request(url, is_forecast=False):
        try:
            response = requests.get(url, timeout=500)
            response.raise_for_status()  # Raise an HTTPError for bad responses
            data = response.json()
            return WeatherUtils.normalize_weather_data(data, is_forecast)
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {e}")
            return None

    @staticmethod
    def normalize_weather_data(data, is_forecast=False):
        # Normalize the response data into a consistent format
        if is_forecast:
            return WeatherUtils.normalize_forecast_data(data)
        return {
            'city': data.get('name', 'Unknown'),
            'temperature': data['main'].get('temp'),
            'humidity': data['main'].get('humidity'),
            'wind_speed': data['wind'].get('speed'),
            'weather_conditions': data['weather'][0].get('description', 'No description'),
        }
    
    @staticmethod
    def normalize_forecast_data(data):
        # Normalize the response data into a consistent format
        five_day_forecast = data['list']
        return [{
            'date': datetime.fromtimestamp(forecast['dt']).strftime('%Y-%m-%d %H:%M:%S'),
            'city': data['city'],
            'temperature': forecast['main']['temp'],
            'humidity': forecast['main']['humidity'],
            'wind_speed': forecast['wind']['speed'],
            'weather_conditions': forecast['weather'][0]['description'],
        } for index, forecast in enumerate(five_day_forecast) if index % 8 == 0]
