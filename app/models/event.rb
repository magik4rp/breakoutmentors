class Event < ApplicationRecord
    
    validates :name, :date, :location, presence: true
    
    def editName(newName)
        self.update_attribute(:name, newName)
    end
    
    def editDate(newDate)
        self.update_attribute(:date, newDate)
    end
    
    def editLocation(newLocation)
        self.update_attribute(:location, newLocation)
    end
    
    def editDescription(newDescription)
        self.update_attribute(:description, newDescription)
    end
    
    #needs to query the database to get the whole list of events
end
