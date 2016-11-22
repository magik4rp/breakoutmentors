Feature: create events 
 
  As an officer
  So that I can monitor the calendar page 
  I want to create events so the club can know and attend the club's events and meetings. 


Background: member in database
	Given the following member exists:
	|name			| email							| major		| status	| is_officer	| sem_hours	| total_hours	|
	|Huda			| jdoe@berkeley.edu	| CS			| active	| 0						| 5					| 10					|

Scenario: edit the page's name 
  	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
    And I am on the profile page 
    Then I create the event with name "Meeting 1", DateTime.new(2016,12,6), location "Sproul" 
    And I edit the name "Meeting 2"
    Then I should see the name as "Meeting 2"

Scenario: edit the page's date
  	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
    And I am on the profile page 
    Then I create the event with name "Meeting 1", DateTime.new(2016,12,6), location "Sproul" 
    And I edit the date DateTime.new(2016,12,7)
    Then I should see the date as DateTime.new(2016,12,7)
  
 Scenario: edit the page's location
  	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
    And I am on the profile page 
    Then I create the event with name "Meeting 1", DateTime.new(2016,12,6), location "Sproul"
    And I edit the location "Dwinelle Hall"
    Then I should see the location as "Dwinelle Hall"

  
 Scenario: edit the page's description
  	When I go to the login page 
	And  I fill in name with "Curry"
	And  I fill in email with "curryofficer@gmail.com"
	And I fill in major with "EECS"
	And  I fill in password with "sc30forthewin" 
	And  I press "Sign up" 
    And I am on the profile page 
    Then I create the event with name "Meeting 1", DateTime.new(2016,12,6), location "Sproul"
    And I edit the description "second meeting"
    Then I should see the description as "second meeting"
  
  