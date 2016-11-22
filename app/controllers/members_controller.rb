class MembersController < ApplicationController
  
  def index
    # current_user.update_attribute(:is_officer, 1)
    @members = User.getMembers
    @is_officer = false 
    if current_user and current_user.is_officer == 1
      @is_officer = true
    end
  end
  def update 
    status = params["status"]
    user = params["member"]
    
    if status
      if status == "false"
        current_user.updateStatus(user, false)
      else 
        current_user.updateStatus(user, true)
      end
    end
  end
  def update_hours
    user = params["member"]
    added_hours = params["added_hours"].to_i
    if added_hours
      if added_hours != 0
        current_user.updateSemHours(user, added_hours)
        current_user.updateTotalHours(user, added_hours)
      end
    end
  end
  def delete
    member = params["member"]
    current_user.deleteMember(member)
  end
  def show
    member = params["member"]
    @member = current_user.getMember(member)
    render json: @member
  end
end
