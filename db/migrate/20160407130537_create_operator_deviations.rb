class CreateOperatorDeviations < ActiveRecord::Migration
  def change
    create_table :operator_deviations do |t|
      t.integer :old_ws_id
      t.integer :new_ws_id
      t.belongs_to :operator, index: true
      t.integer :dev_time

      t.timestamps null: false
    end
  end
end
