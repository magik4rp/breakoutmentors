class AddSemHoursToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :sem_hours, :integer, :default => 0
  end
end
