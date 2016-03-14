class CreateHourlyOutputs < ActiveRecord::Migration
  def change
    create_table :hourly_outputs do |t|
      t.belongs_to :work_station, index: true
      t.integer :output
      t.datetime :logged_at
      t.string :remarks

      t.timestamps null: false
    end
  end
end