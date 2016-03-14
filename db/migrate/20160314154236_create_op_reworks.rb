class CreateOpReworks < ActiveRecord::Migration
  def change
    create_table :op_reworks do |t|
      t.belongs_to :work_station, index: true
      t.integer :rework
      t.datetime :logged_at
      t.string :remarks

      t.timestamps null: false
    end
  end
end
