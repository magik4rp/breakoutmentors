class AddOfficerStatusToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :is_officer, :integer, default: 0
  end
end
