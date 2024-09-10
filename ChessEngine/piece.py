class Piece:
    def __init__(self, name,color, position):
        self.name = name 
        self.color = color 
        self.position = position 

    def move(self, new_position):
        self.position = new_position

    def generate_id(self):
        return self.name + self.color + self.position

    def __str__(self):
        return self.name + " " + self.color + " " + self.position