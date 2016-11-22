#Credit the Invent With Python book (http://inventwithpython.com)
#for doRectsOverlap and isPointInsideRect functions

#used to detect collisions in our game
def doRectsOverlap(rect1, rect2):
    for a, b in [(rect1, rect2), (rect2, rect1)]:
        # Check if a's corners are inside b
        if ((isPointInsideRect(a.left, a.top, b)) or
            (isPointInsideRect(a.left, a.bottom, b)) or
            (isPointInsideRect(a.right, a.top, b)) or
            (isPointInsideRect(a.right, a.bottom, b))):
            return True

    return False

#used the by the doRectsOverlap function (won't be called directly from game code)
def isPointInsideRect(x, y, rect):
    if (x > rect.left) and (x < rect.right) and (y > rect.top) and (y < rect.bottom):
        return True
    else:
        return False

#make rectangle objects
def makeRects(board):
    emptyBoard = []
    y = 165
    for row in board:
        emptyRow = []
        x = 245
        for square in row:
            newRect = pygame.Rect(x,y,50,50)
            emptyRow.append(newRect)
            x += 51
        y+=51
        emptyBoard.append(emptyRow)
    return emptyBoard

#check for a victory
def checkVictory(x, y):
    if board[y][0] == board[y][1] == board[y][2]:
        return board[y][0]
    if board[0][x] == board[1][x] == board[2][x]:
        return board[0][x]
    if board[0][0] == board[1][1] == board[2][2]:
        return board[0][0]
    if board[2][0] == board[1][1] == board[0][2]:
        return board[2][0]

def tie(board):
    zeroes = 0
    for i in range(len(board)):
        for j in range(len(board)):
            if board[i][j] == 0:
                zeroes += 1
    if zeroes == 0:
        return True
    
import pygame, sys, random
pygame.init()
screen = pygame.display.set_mode([640,480])
pictonBlue = (34,167,240)

#the game's variables
#SECTION 1 - YOUR CODE HERE FOR CREATING VARIABLES AND FUNCTIONS
board = [[0,0,0],[0,0,0],[0,0,0]]
board_squares = makeRects(board)
player1_color = (242,38,19)
player2_color = (247,202,24)
white = (255,255,255)

title = pygame.image.load("tictacto.png")
currentPlayer = 1
#change players
def opposite(player):
    if player == 1:
        return 2
    else:
        return 1
running = True
#game loop
while running:
    if tie(board):
        print("It's a tie!")
        running = false
        
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.MOUSEBUTTONDOWN:
            x,y = event.pos
            for i in range(len(board)):
                for j in range(len(board[0])):
                    rect = board_squares[i][j]
                    if isPointInsideRect(x,y, rect) and board[i][j] == 0:
                        board[i][j] = currentPlayer
                        currentPlayer = opposite(currentPlayer)
                        win = checkVictory(j,i)
                        print("Checking win at: " + str(j) +"," + str(i))
                        if win == 1 or win == 2:
                            print("Player " + str(win) + " wins!")
                            running = False
    
    #pause for 20 milliseconds
    pygame.time.delay(20)
    #make the screen completely black
    screen.fill(pictonBlue)

    #logic for moving everything in the game and checking collisions
    #SECTION 4 - YOUR CODE HERE FOR CHANGING VARIABLES AND CHECKING FOR COLLISIONS
    
    #draw everything on the screen
    #SECTION 5 - YOUR CODE HERE FOR DRAWING EVERYTHING
    for y in range(len(board)):
        for x in range(len(board[0])):
            player = board[y][x]
            square = board_squares[y][x]
            if player == 0:
                pygame.draw.rect(screen, white, (square.x, square.y, square.width, square.height))
            if player == 1:
                pygame.draw.rect(screen, player1_color, (square.x, square.y, square.width, square.height))
            if player == 2:
                pygame.draw.rect(screen, player2_color, (square.x, square.y, square.width, square.height))
    screen.blit(title,(230,100))
    #update the entire display
    pygame.display.update()


pygame.quit()
