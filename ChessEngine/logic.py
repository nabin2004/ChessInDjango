from piece import Piece

def main(piece: Piece):
    if validMove():
        checkDeathLogic()
        movePiece()
        checkPromotion()
        checkCheck()
        checkMate()
        checkStaleMate()
        checkDraw()
    else:
        print("Invalid move")

def validMove():
    pass 

def checkDeathLogic():
    pass

def movePiece():
    pass

def checkPromotion():
    pass

def checkCheck():
    pass

def checkMate():
    pass

def checkStaleMate():
    pass

def checkDraw():
    pass