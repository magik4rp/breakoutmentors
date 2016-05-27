import pygame, sys
pygame.init()
screen = pygame.display.set_mode([640,480])
white = [255, 255, 255]

#Part 1: Make your ghosts here! Load the images and resize them.

#Part 1: Add all the variables for your ghosts here!

#Part 2: Add Pacman!

#Part 2: Add Pacman's variables!
while True:
    #this checks if you've exited the game
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            #sys.exit()
        if event.type == pygame.KEYDOWN:
            #Part 2: Fill in the movement logic!
            if event.key == pygame.K_RIGHT:
                #Fill in
            if event.key == pygame.K_LEFT:
                #Fill in
            if event.key == pygame.K_UP:
                #Fill in
            if event.key == pygame.K_DOWN:
                #Fill in
  pygame.time.delay(20)
  screen.fill(white)
  #Part 1: Blit the ghosts on the screen at their locations.
  
  #Part 2: Blit Pacman!
  pygame.display.update()
