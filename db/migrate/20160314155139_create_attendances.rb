class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
      t.belongs_to :work_station, index: true
      t.boolean :present, default: true
      t.datetime :logged_at

      t.timestamps null: false
    end
  end
end
