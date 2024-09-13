class Board:
    def __init__(self):
        # Initialize the board with empty strings instead of NumPy arrays
        self.grid = {
            8 : {'a': 'a8', 'b': 'b8', 'c': 'c8', 'd': 'd8', 'e': 'e8', 'f': 'f8', 'g': 'g8', 'h': 'h8'},
            7 : {'a': 'a7', 'b': 'b7', 'c': 'c7', 'd': 'd7', 'e': 'e7', 'f': 'f7', 'g': 'g7', 'h': 'h7'},
            6 : {'a': 'a6', 'b': 'b6', 'c': 'c6', 'd': 'd6', 'e': 'e6', 'f': 'f6', 'g': 'g6', 'h': 'h6'},
            5 : {'a': 'a5', 'b': 'b5', 'c': 'c5', 'd': 'd5', 'e': 'e5', 'f': 'f5', 'g': 'g5', 'h': 'h5'},
            4 : {'a': 'a4', 'b': 'b4', 'c': 'c4', 'd': 'd4', 'e': 'e4', 'f': 'f4', 'g': 'g4', 'h': 'h4'},
            3 : {'a': 'a3', 'b': 'b3', 'c': 'c3', 'd': 'd3', 'e': 'e3', 'f': 'f3', 'g': 'g3', 'h': 'h3'},
            2 : {'a': 'a2', 'b': 'b2', 'c': 'c2', 'd': 'd2', 'e': 'e2', 'f': 'f2', 'g': 'g2', 'h': 'h2'},
            1 : {'a': 'a1', 'b': 'b1', 'c': 'c1', 'd': 'd1', 'e': 'e1', 'f': 'f1', 'g': 'g1', 'h': 'h1'},
        }

    def print_board(self):
        for row in self.grid:
            print(row)

    def get_box(self, position):
        alphabet = position[0]
        number = int(position[1])
        return self.grid[number][alphabet]