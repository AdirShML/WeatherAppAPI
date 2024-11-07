from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .api.weather_service import WeatherCacheService
import logging
import geocoder

logger = logging.getLogger(__name__)

class WeatherAPIView(APIView):
    params = ['City Name','Coordinates', 'GeoLocation']
        
    def post(self, request):
        # import pdb; pdb.set_trace();
        payload = request.data.get('payload')
        choice = payload['choice']
        weather_type = payload['weather_type']
        
        if choice == 'GeoLocation':
            try:
                g = geocoder.ip('me')
                print(g.city)
                if g.ok: 
                    city = g.city
                    return self.get_by_city(city, weather_type) 
            except (ValueError, TypeError):
                return Response({'error': 'cant find current location'},
                                status=status.HTTP_400_BAD_REQUEST)
                
        value = payload['value']
        if choice == 'City Name':
            return self.get_by_city(value, weather_type)
        
        elif choice == 'Coordinates':
            try:
                lat = float(value['latitude'])
                lon = float(value['longitude'])
                return self.get_coordinates(lat, lon, weather_type)
            except (ValueError, TypeError):
                return Response({'error': 'Invalid coordinates format. Use "lat,lon" format.'}, 
                                status=status.HTTP_400_BAD_REQUEST)             
                
        
    def get_by_city(self, key, weather_type="weather"):
        if key:
            weather_data = WeatherCacheService.get_weather_by_city(weather_type, key)
            if weather_data:
                return Response(weather_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No cached weather data available for this city'}, 
                                status=status.HTTP_404_NOT_FOUND)
    
    def get_coordinates(self, lat, lon, weather_type="weather"):    
        if lat is not None and lon is not None:
            weather_data = WeatherCacheService.get_weather_by_coordinates(weather_type, lat, lon) 
            if weather_data:
                return Response(weather_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': f'No {weather_type} data found for these coordinates.'}, 
                                status=status.HTTP_404_NOT_FOUND)
                
    def get(self, request):
        city = request.query_params.get('city')
        if not city:  
            return Response({'error': 'Please provide a valid city'}, status=status.HTTP_400_BAD_REQUEST)
        weather_type = 'weather'
        cache_value = self.get_by_city(weather_type, city)
        if cache_value:
            return Response(cache_value, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No cached data found for the given city'}, status=status.HTTP_404_NOT_FOUND)
        
        
        
        
        
        
                
