class RemoveSemHoursFromUser < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :sem_hours, :integer
  end
end
