require "spec_helper"

describe ProfileController, :type => :controller  do 
  
    it 'should update some details' do 
        @user = double("user", {:id => "2", :name => "314", :details => "My name is Steven"})
        @user.stub(:update).with(:details => "updateee")
    end 
end 