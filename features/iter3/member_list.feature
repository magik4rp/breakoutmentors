
    
# Iteration 3:
Feature: member management page
	As an officer 
    I want to be able to view all of the members
    So that officers can see all of the members' information and edit as necessary 

Background: member in database
	Given the following member exists:
	|name			| email							| major		| status	| is_officer	| sem_hours	| total_hours	|
	|Huda			| jdoe@berkeley.edu	            | CS	    | active	| 0				| 5			| 10			|
    |Phoebe         | phoebe@berkeley.edu           | CS        | active    | 1             | 0         | 10            | 
Scenario: user updates semester hours, which updates total hours 
    When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
	And I go to the membership page 
	And I fill in the semester hours for member "Phoebe" with 3
	Then the total hours should be 13 
	And the semester hours should be 3  
	
	
Scenario: user updates semester hours # not an actual #, sad path 
	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
    And I go to the membership page 
    And I fill in the semester hours for member "Phoebe" with "a"
    Then I should see message "Not an actual number, try again."

 
Scenario: user updates status  
  
  	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
	And I go to the membership page 
	And I click the status for member "Phoebe"
	Then the status for member "Phoebe" should be "inactive"