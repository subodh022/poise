class RemoveOperatorColFromWs < ActiveRecord::Migration
  def change
  	remove_column :work_stations, :operator_id
  end
end
