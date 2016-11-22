class RemoveTtlHoursFromUser < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :total_hours, :integer
  end
end
