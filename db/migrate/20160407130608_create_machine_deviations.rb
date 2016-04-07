class CreateMachineDeviations < ActiveRecord::Migration
  def change
    create_table :machine_deviations do |t|
      t.integer :old_ws_id
      t.integer :new_ws_id
      t.belongs_to :machine, index: true
      t.integer :dev_time

      t.timestamps null: false
    end
  end
end
