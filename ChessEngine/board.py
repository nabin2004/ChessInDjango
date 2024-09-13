from piece import Piece  # Assuming this exists

class Board:
    def __init__(self):
        self.grid = {
            8: {'a': Piece('rook', 'black', 'a8'), 'b': Piece('knight', 'black', 'b8'), 'c': Piece('bishop', 'black', 'c8'), 'd': Piece('queen', 'black', 'd8'), 'e': Piece('king', 'black', 'e8'), 'f': Piece('bishop', 'black', 'f8'), 'g': Piece('knight', 'black', 'g8'), 'h': Piece('rook', 'black', 'h8')},
            7: {'a': Piece('pawn', 'black', 'a7'), 'b': Piece('pawn', 'black', 'b7'), 'c': Piece('pawn', 'black', 'c7'), 'd': Piece('pawn', 'black', 'd7'), 'e': Piece('pawn', 'black', 'e7'), 'f': Piece('pawn', 'black', 'f7'), 'g': Piece('pawn', 'black', 'g7'), 'h': Piece('pawn', 'black', 'h7')},
            6: {'a': None, 'b': None, 'c': None, 'd': None, 'e': None, 'f': None, 'g': None, 'h': None},
            5: {'a': None, 'b': None, 'c': None, 'd': None, 'e': None, 'f': None, 'g': None, 'h': None},
            4: {'a': None, 'b': None, 'c': None, 'd': None, 'e': None, 'f': None, 'g': None, 'h': None},
            3: {'a': None, 'b': None, 'c': None, 'd': None, 'e': None, 'f': None, 'g': None, 'h': None},
            2: {'a': Piece('pawn', 'white', 'a2'), 'b': Piece('pawn', 'white', 'b2'), 'c': Piece('pawn', 'white', 'c2'), 'd': Piece('pawn', 'white', 'd2'), 'e': Piece('pawn', 'white', 'e2'), 'f': Piece('pawn', 'white', 'f2'), 'g': Piece('pawn', 'white', 'g2'), 'h': Piece('pawn', 'white', 'h2')},
            1: {'a': Piece('rook', 'white', 'a1'), 'b': Piece('knight', 'white', 'b1'), 'c': Piece('bishop', 'white', 'c1'), 'd': Piece('queen', 'white', 'd1'), 'e': Piece('king', 'white', 'e1'), 'f': Piece('bishop', 'white', 'f1'), 'g': Piece('knight', 'white', 'g1'), 'h': Piece('rook', 'white', 'h1')},
        }

    def add_piece(self, piece:str, position:str) -> None:
        alphabet = position[0]
        number = int(position[1])
        self.grid[number][alphabet] = str(piece)

    def print_board(self):
        for number in range(8, 0, -1):
            row = ''
            for alphabet in 'abcdefgh':
                row += self.grid[number][alphabet] + ' '
            print(row)

    def get_box(self, position):
        alphabet = position[0]
        number = int(position[1])
        return self.grid[number][alphabet]
    
    def move_piece(self):
        pass

    def draw_board(self, filename='chessboard.png'):
        from PIL import Image, ImageDraw, ImageFont

        # Unicode symbols for the chess pieces
        piece_symbols = {
            ('king', 'white'): '\u2654',   # White King
            ('queen', 'white'): '\u2655',  # White Queen
            ('rook', 'white'): '\u2656',   # White Rook
            ('bishop', 'white'): '\u2657', # White Bishop
            ('knight', 'white'): '\u2658', # White Knight
            ('pawn', 'white'): '\u2659',   # White Pawn
            ('king', 'black'): '\u265A',   # Black King
            ('queen', 'black'): '\u265B',  # Black Queen
            ('rook', 'black'): '\u265C',   # Black Rook
            ('bishop', 'black'): '\u265D', # Black Bishop
            ('knight', 'black'): '\u265E', # Black Knight
            ('pawn', 'black'): '\u265F'    # Black Pawn
        }

        # Setting up dimensions
        cell_size = 80
        board_size = 8 * cell_size

        # Create a blank image
        img = Image.new('RGB', (board_size, board_size), color='white')
        draw = ImageDraw.Draw(img)

        # Draw the chess board
        for i in range(8):
            for j in range(8):
                top_left = (j * cell_size, i * cell_size)
                bottom_right = ((j + 1) * cell_size, (i + 1) * cell_size)
                fill_color = (125, 148, 93) if (i + j) % 2 == 0 else (238, 238, 210)
                draw.rectangle([top_left, bottom_right], fill=fill_color)

        # Load the font for chess pieces
        try:
            font = ImageFont.truetype("DejaVuSans-Bold.ttf", 48)
        except IOError:
            font = ImageFont.load_default()

        # Draw the chess pieces using Unicode symbols
        for number in range(1, 9):
            for alphabet in 'abcdefgh':
                piece = self.grid[number][alphabet]
                if isinstance(piece, Piece):
                    symbol = piece_symbols.get((piece.name, piece.color), ' ')
                    x = ('abcdefgh'.index(alphabet)) * cell_size + 20
                    y = (8 - number) * cell_size + 10
                    draw.text((x, y), symbol, fill="black", font=font)

        # Save the image
        img.save(filename)





# Example usage:
b = Board()
b.draw_board()
