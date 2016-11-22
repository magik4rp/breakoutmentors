class RemoveOfficerFromUser < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :is_officer, :string
  end
end
