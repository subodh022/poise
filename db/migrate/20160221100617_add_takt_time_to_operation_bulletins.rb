class AddTaktTimeToOperationBulletins < ActiveRecord::Migration
  def change
    add_column :operation_bulletins, :takt_time, :float
  end
end
