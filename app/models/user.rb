class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable 
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # Set validation
  validates :name, :email, :major, presence: true
  
  # Set default values for description.
  after_initialize :init
 
  # Set default avatar to be /public/images/missing_ava.png
  has_attached_file :avatar, :styles => { :medium => "225x225>", :thumb => "100x100#" }, :default_url => "/images/:style/missing_ava.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  # Initialize default values.
  def init
      self.description  ||= "Here's a short description about yourself. You should update this because you know you better than we know you :) "           #will set the default value only if it's nil
      self.sem_hours ||= 0 #let's you set a default association
      self.total_hours ||= 0
      self.status ||= true
  end

  # Get the list of all members
  def self.getMembers
    User.all()
  end
  
  # Actions can be done by any member
  def isOfficer
    if self.is_officer == 1
      return true
    else
      return false
    end
  end
  
  def editName(new_name)
    if (new_name.length != 0)
      self.update_attribute(:name, new_name)
    else 
      self.update_attribute(:name, "Error: Put a name longer than one letter")
    end 
  end
  
  def editDescription(new_description)
    self.update_attribute(:description, new_description)
  end
  
  def editAvatar(new_avatar)
    File.open("new_avatar", 'wb') do |f|
      f.write new_avatar
      self.update_attribute(:avatar, f)
    end
    
  end
  
  # Actions only happen iff the current user is an officer
  def getMember(id)
    member = User.find(id)
    return member
  end
  def getMemberName(id)
    member = User.find(id)
    return member.name
  end
  
  def getMemberEmail(id)
    member = User.find(id)
    return member.email
  end
  
  def getMemberTotalHours(id)
    member = User.find(id)
    return member.total_hours
  end
  
  def getMemberSemHours(id)
    member = User.find(id)
    return member.sem_hours
  end
  
  def updateRanking(id)
    member = User.find(id)
    if self.is_officer == 1
      member.update_attribute(:is_officer, 1)
    end
  end
  
  def updateStatus(id, stat)
    member = User.find(id)
    if self.is_officer == 1 
      member.update_attribute(:status, stat)
    end
  end

  
  # Need modification for the level according to the new sem_hours and total_hours
  def updateSemHours(id, new_sem_hours)
    member = User.find(id)
    old_hours = member.sem_hours
    if new_sem_hours.is_a? Numeric
      if self.is_officer == 1
        member.update_attribute(:sem_hours, old_hours.to_i + new_sem_hours.to_i)
      end
    else 
      return "Not an actual number, try again."
    end 
  end
  
  def updateTotalHours(id, new_total_hours)
    member = User.find(id)
    old_hours = member.total_hours
    if self.is_officer == 1
      member.update_attribute(:total_hours, (old_hours.to_i + new_total_hours.to_i))
    end
  end
  
  def deleteMember(id)
    member = User.find(id)
    if self.is_officer == 1 && id != self.id.to_s
      member.destroy
    else
      print("DID NOT DELETE")
    end
  end
  
end
