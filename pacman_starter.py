import pygame, sys
pygame.init()
screen = pygame.display.set_mode([640,480])
white = [255, 255, 255]

#Part 1: Make your ghosts here! Load the images and resize them.

#Part 1: Add all the variables for your ghosts here!

while True:
    #this checks if you've exited the game
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            #sys.exit()
  pygame.time.delay(20)
  screen.fill(white)
  #Part 1: Show the ghosts on the screen at their locations.
  pygame.display.update()
