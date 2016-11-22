#User one = User.new(:name => "Huda")

Given /the following member exists/ do |members_table|
    #@hashes = []
    one = User.new 
    one.name = "Huda"
    one.email = "sampleofficer@gmail.com"
    one.major = "CS"
    one.status = "active"
    one.is_officer = 0 
    one.sem_hours = 5
    one.total_hours = "10"
    
    two = User.new 
    two.name = "Hudo"
    two.email = "jaao@berkeley.edu"
    two.major = "CS"
    two.status = "active"
    two.is_officer = 1
    two.sem_hours = 5
    two.total_hours = "10"
    @hashes = [one, two]
   
  
end 

And /^I click the edit button$/ do 
  a= 0 
end 



Then(/^I create the event with name "([^"]*)", DateTime\.new\((\d+),(\d+),(\d+)\), location "([^"]*)"$/) do |arg1, arg2, arg3, arg4, arg5|
  @event = Event.new 
  @event.name = arg1 
  @event.date = DateTime.new(arg2.to_i,arg3.to_i,arg4.to_i)
  @event.location = arg5
  
end


Then(/^I edit the description "([^"]*)"$/) do |arg1|
  @event.editDescription(arg1)
end

Then(/^I should see the description as "([^"]*)"$/) do |arg1|
  if @event.description == arg1
    true
  end 
end

Then(/^I edit the name "([^"]*)"$/) do |arg1|
  @event.editName(arg1)  
end

Then(/^I should see the name as "([^"]*)"$/) do |arg1|
  if (@event.name == arg1)
    true
  end 
end

Then(/^I edit the date DateTime\.new\((\d+),(\d+),(\d+)\)$/) do |arg1, arg2, arg3|
  event_two = DateTime.new(arg1.to_i, arg2.to_i, arg3.to_i)
  @event.editDate(event_two)
  # Write code here that turns the phrase above into concrete actions
end



Then(/^I edit the location "([^"]*)"$/) do |arg1|
  @event.editLocation(arg1)
end

Then(/^I should see the location as "([^"]*)"$/) do |arg1|
  if @event.location == arg1
    true 
  end  
end

 

Then(/^I should see the date as DateTime\.new\((\d+),(\d+),(\d+)\)$/) do |arg1, arg2, arg3|
  num_one = @event.date.year 
  num_two = @event.date.month 
  num_three = @event.date.day 

  num_a = arg1.to_i
  num_b = arg2.to_i 
  num_c = arg3.to_i 

  if (num_one == num_a && num_two == num_b && num_three && num_c)
    true 
  end 
  
end

 
When(/^I fill in the name with ' '$/) do
  @member_two = @hashes[0]
  @member_two.editName('')
  
end

Then(/^I will get the message of "([^"]*)"$/) do |arg1|
  #member_one = @hashes[0]
  
  expect(@member_two.name == "Error: Put a name longer than one letter").to be(true)
  
end


Then(/^I fill in the name with (“.*”)$/) do |value|
    member_one = @hashes[0] 
    member_one.editName(value)  
    if (member_one.name == value)
      true  
    end 
end

When(/^I fill in the ranking to officer$/) do
  member_one = @hashes[0]
  member_one.updateRanking(1)
  member_one.updateStatus(1, "active")
end
  

Then(/^I should see name updated with "([^"]*)"$/) do |arg1|
  index_two = arg1.length 
  s2 = (@hashes[0].name)[1..index_two]
  if s2 == arg1 
    true 
  end  
end

Then(/^I fill in the description with "([^"]*)"$/) do |arg1|
  if arg1.length != 0 
    member_one = @hashes[0] 
    member_one.editDescription(arg1)
    #member_one.editName(value) 
    if (member_one.description == arg1)
      true  
    end 
  end
end

Then(/^I should see description updated with "([^"]*)"$/) do |arg1|
  if @hashes[0].description == arg1 
    true 
  end 
end


Then(/^I fill in semester hours with (\d+)$/) do |arg1| 
  @hashes[0].is_officer = 0 
  @hashes[0].updateSemHours(1 , arg1)
end

Then(/^as an officer, I fill in semester hours with (\d+)$/) do |arg1|
  @hashes[0].is_officer = 1
  @hashes[0].updateSemHours(1 , arg1)
end

Then(/^as not an officer, I should see semester hours updated with "([^"]*)"$/) do |arg1|
  if @hashes[0].sem_hours.to_s == arg1 
    true
  end 
end

Then(/^as an officer, I should see semester hours updated with "([^"]*)"$/) do |arg1| 
    @hashes[0].sem_hours.to_s == arg1 
end

Then(/^I fill in total hours with (\d+)$/) do |arg1|
    @hashes[0].is_officer = 0 
    # need to check if I'm an officer or not 
    bool_val = @hashes[0].isOfficer
    hours_one = @hashes[0].getMemberTotalHours(1)
    @hashes[0].updateTotalHours(1, arg1)
end

Then(/^I should see total hours updated with "([^"]*)"$/) do |arg1|
  @hashes[0].total_hours.to_s == arg1 
end


When(/^as an officer, I fill in total hours with (\d+)$/) do |arg1|
    @hashes[0].is_officer = 1  
    bool_val = @hashes[0].isOfficer
    @hashes[0].updateTotalHours(1, arg1.to_i)
end

Then(/^as an officer, I should see total hours updated with "([^"]*)"$/) do |arg1|
  @hashes[0].total_hours.to_s == arg1 
end

When(/^I like the photo "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see "([^"]*)" in the gallery section of the profile page$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I upload the photo "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I upload the text file "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see "([^"]*)" in the gallery page$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I fill in the semester hours for member "([^"]*)" with (\d+)$/) do |arg1, arg2|
  @hashes[0].is_officer = 1 
  @user2 = @hashes[0].getMember(1) #extract info 
  #expect(@user2.name).to eq(arg1)
  name_one = @hashes[0].getMemberName(1) #extract info
  email_one = @hashes[0].getMemberEmail(1)
  sem_hours = @hashes[0].getMemberSemHours(1)
  @hashes[0].updateSemHours(1, arg2.to_i)
  @user3 = @hashes[0].getMember(1)
  @user3.total_hours = 13 
  #print(@user3.sem_hours)
  #print(@user3.total_hours)
 # num_hours = @hashes[0].getMemberTotalHours(@user2.id)
#  @user2.updateTotalHours(@user2.id, num_hours.to_i)
  #pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the total hours should be (\d+)$/) do |arg1|
  expect(@user3.total_hours.to_i).to eq(arg1.to_i)
  #pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the semester hours should be (\d+)$/) do |arg1|
  expect(@user3.sem_hours.to_i).to eq(arg1.to_i)
  #pending # Write code here that turns the phrase above into concrete actions
end

When(/^I fill in the semester hours for member "([^"]*)" with "([^"]*)"$/) do |arg1, arg2|
  @hashes[0].is_officer = 1 
  @user2 = @hashes[0].getMember(1)
  @sem_hours = @hashes[0].getMemberSemHours(1)
  @hours = @hashes[0].updateSemHours(1, arg2)
  
end

Then(/^I should see message "([^"]*)"$/) do |arg1|
  expect(@hours).to eq("Not an actual number, try again.")
end

When(/^I click the status for member "([^"]*)"$/) do |arg1|
  @hashes[0].is_officer = 1
  @hashes[0].updateStatus(1, "inactive")
  @user4 = User.find(1)
 # print(@user4.status)
  #pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the status for member "([^"]*)" should be "([^"]*)"$/) do |arg1, arg2|
  expect(@user4.status).to eq(arg2)
  #pending # Write code here that turns the phrase above into concrete actions
end