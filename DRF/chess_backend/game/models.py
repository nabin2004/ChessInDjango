from django.db import models

class User(models.Model):
    USER_TYPES = [
        ('Admin', 'Admin'),
        ('Player', 'Player'),
        ('Guest', 'Guest')
    ]

    user_id = models.AutoField(primary_key=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    hashed_password = models.CharField(max_length=255)
    registration_date = models.DateTimeField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.user_type})"


class Game(models.Model):
    game_id = models.AutoField(primary_key=True)
    player1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='games_as_player1')
    player2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='games_as_player2')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='games_won')
    loser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='games_lost')

    def __str__(self):
        return f"Game {self.game_id} between {self.player1} and {self.player2}"


class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"Chat {self.chat_id} in Game {self.game_id}"


class Move(models.Model):
    move_id = models.AutoField(primary_key=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    source_square = models.CharField(max_length=5)
    destination_square = models.CharField(max_length=5)
    piece_moved = models.CharField(max_length=10)
    promotion = models.CharField(max_length=10, null=True, blank=True)
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"Move {self.move_id} in Game {self.game_id}"


class PlayerStats(models.Model):
    stats_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    games_played = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    quit_games = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)

    def __str__(self):
        return f"Stats for {self.user}"
