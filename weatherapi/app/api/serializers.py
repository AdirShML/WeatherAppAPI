from rest_framework import serializers

## i used a formating method for normalize data in this specific project, for more convenience and adding options-- searializers is the key!!!

class WeatherDataSerializer(serializers.Serializer):
    city = serializers.CharField(source='name', max_length=100)
    temperature = serializers.FloatField(source='main.temp')
    humidity = serializers.IntegerField(source='main.humidity')
    wind_speed = serializers.FloatField(source='wind.speed')
    weather_conditions = serializers.CharField(source='weather.0.description', max_length=100)