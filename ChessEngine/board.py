class Board:
    def __init__(self):
        self.grid = {
            8 : {'a': 'a8', 'b': 'b8', 'c': 'c8', 'd': 'd8', 'e': 'e8', 'f': 'f8', 'g': 'g8', 'h': 'h8'},
            7 : {'a': 'a7', 'b': 'b7', 'c': 'c7', 'd': 'd7', 'e': 'e7', 'f': 'f7', 'g': 'g7', 'h': 'h7'},
            6 : {'a': 'a6', 'b': 'b6', 'c': 'c6', 'd': 'd6', 'e': 'e6', 'f': 'f6', 'g': 'g6', 'h': 'h6'},
            5 : {'a': 'a5', 'b': 'b5', 'c': 'c5', 'd': 'd5', 'e': 'e5', 'f': 'f5', 'g': 'g5', 'h': 'h5'},
            4 : {'a': 'a4', 'b': 'b4', 'c': 'c4', 'd': 'd4', 'e': 'e4', 'f': 'f4', 'g': 'g4', 'h': 'h4'},
            3 : {'a': 'a3', 'b': 'b3', 'c': 'c3', 'd': 'd3', 'e': 'e3', 'f': 'f3', 'g': 'g3', 'h': 'h3'},
            2 : {'a': 'a2', 'b': 'b2', 'c': 'c2', 'd': 'd2', 'e': 'e2', 'f': 'f2', 'g': 'g2', 'h': 'h2'},
            1 : {'a': 'ROOK', 'b': 'b1', 'c': 'c1', 'd': 'd1', 'e': 'e1', 'f': 'f1', 'g': 'g1', 'h': 'h1'},
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
        # Setting up dimensions
        cell_size = 80
        board_size = 8 * cell_size
        
        # Creating a blank image
        img = Image.new('RGB', (board_size, board_size), color='white')
        draw = ImageDraw.Draw(img)

        # Drawing the board
        for i in range(8):
            for j in range(8):
                top_left = (j * cell_size, i * cell_size)
                bottom_right = ((j + 1) * cell_size, (i + 1) * cell_size)
                fill_color = (125, 148, 93) if (i + j) % 2 == 0 else (238, 238, 210)
                draw.rectangle([top_left, bottom_right], fill=fill_color)

        # Loading the font for chess pieces 
        try:
            font = ImageFont.truetype("DejaVuSans-Bold.ttf", 48)
        except IOError:
            font = ImageFont.load_default()

        # Drawing the chess pieces
        for number in range(1, 9):
            for alphabet in 'abcdefgh':
                piece = self.grid[number][alphabet]
                if piece != ' ':
                    x = ('abcdefgh'.index(alphabet)) * cell_size + 20
                    y = (8 - number) * cell_size + 15
                    draw.text((x, y), piece, fill="black", font=font)
        img.save(filename)

b = Board()
b.print_board()
b.draw_board()