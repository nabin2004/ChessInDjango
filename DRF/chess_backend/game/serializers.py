# game/serializers.py
from rest_framework import serializers
from .models import User, Game, Chat, Move, PlayerStats

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

class MoveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Move
        fields = '__all__'

class PlayerStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStats
        fields = '__all__'
