# Iteration 3:
#Feature: gallery page
#	As an officer/member
#    I want to be able to view/edit a gallery
#    So I can see all of the pictures the club hosts 

#Background: member in database
#	Given the following member exists:
#	|name			| email							| major		| status	| is_officer	| sem_hours	| total_hours	|
#	|Huda			| jdoe@berkeley.edu	            | CS	    | active	| 0				| 5			| 10			|
#    |Phoebe         | phoebe@berkeley.edu           | CS        | active    | 1             | 0         | 10            |



#Scenario: member likes a photo 
    
#	When I go to the gallery page 
#	And I like the photo "kitty.jpg"
#	When I go to the profile page # you have small typo here earlier. you have extra Then
#	Then I should see "kitty.jpg" in the gallery section of the profile page 
	
	
#Scenario: officer is able to add photo 

#    When I go to the gallery page 
#    And I click the edit button 
#    And I upload the photo "kitty.jpg"
#    Then I should see "kitty.jpg" in the gallery section of the profile page 

#Scenario: officer tries to upload something that's not a photo #sad path 
#    When I go to the gallery page 
#    And I click the edit button 
#    And I upload the text file "Hi.txt"
#    Then I should see "This is not a photo, please resubmit" in the gallery page 
    
    