class AddWorkstationOperatorIdToAttendances < ActiveRecord::Migration
  def change
  	add_column :attendances, :workstation_operator_id, :integer, index: true
  end
end
