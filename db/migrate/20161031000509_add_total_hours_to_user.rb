class AddTotalHoursToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :total_hours, :integer, :default => 0
  end
end
