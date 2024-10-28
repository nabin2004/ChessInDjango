from django.contrib import admin
from .models import User, Game, Chat, Move, PlayerStats

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'user_type', 'first_name', 'last_name', 'email', 'registration_date')
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('user_type', 'registration_date')

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('game_id', 'player1', 'player2', 'start_time', 'end_time', 'winner', 'loser')
    list_filter = ('start_time', 'end_time')
    search_fields = ('player1__first_name', 'player2__first_name', 'winner__first_name', 'loser__first_name')

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('chat_id', 'game', 'sender', 'receiver', 'message', 'timestamp')
    search_fields = ('sender__first_name', 'receiver__first_name', 'message')
    list_filter = ('timestamp',)

@admin.register(Move)
class MoveAdmin(admin.ModelAdmin):
    list_display = ('move_id', 'game', 'player', 'source_square', 'destination_square', 'piece_moved', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('source_square', 'destination_square', 'piece_moved')

@admin.register(PlayerStats)
class PlayerStatsAdmin(admin.ModelAdmin):
    list_display = ('stats_id', 'user', 'games_played', 'wins', 'losses', 'draws', 'quit_games', 'rating')
    search_fields = ('user__first_name', 'user__last_name')
    list_filter = ('games_played', 'wins', 'losses', 'draws', 'rating')
