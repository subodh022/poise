class CreateMachineDowntimes < ActiveRecord::Migration
  def change
    create_table :machine_downtimes do |t|
      t.belongs_to :work_station, index: true
      t.integer :downtime
      t.datetime :logged_at
      t.string :remarks

      t.timestamps null: false
    end
  end
end
