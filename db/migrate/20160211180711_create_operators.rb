class CreateOperators < ActiveRecord::Migration
  def change
    create_table :operators do |t|
      t.belongs_to :line, index: true
      t.string :emp_name
      t.integer :emp_id

      t.timestamps null: false
    end
  end
end
