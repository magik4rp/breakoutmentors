# Iteration 2:
Feature: user model feature
	As a user 
    I want to have a model 
    So that my information will be stored in the database and be available when I log in.   

Background: member in database
	Given the following member exists:
	|name			| email							| major		| status	| is_officer	| sem_hours	| total_hours	|
	|Huda			| jdoe@berkeley.edu	| CS			| active	| 0						| 5					| 10					|
	|Hudo			| jdoo@berkeley.edu	| CS			| active	| 1						| 5					| 10					|

Scenario: user updates semester hours #sad path (no update because not officer)
	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
  And I am on the profile page 
  And I click the edit button 
  And I fill in semester hours with 40
	Then as not an officer, I should see semester hours updated with "5"

Scenario: user updates semester hours #happy path (will actually update because an officer)
	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
  And I am on the profile page 
  And I click the edit button 
  And as an officer, I fill in semester hours with 40
	Then as an officer, I should see semester hours updated with "40"
	
	
Scenario: user updates total hours # sad path because not an officer
  When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
  And I am on the profile page 
  And I click the edit button 
	And I fill in total hours with 50  
	Then I should see total hours updated with "10" 
	
Scenario: user updates total hours # happy path because an officer
  When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
  And I am on the profile page 
  And I click the edit button 
	And as an officer, I fill in total hours with 50  
	Then as an officer, I should see total hours updated with "50" 
	
