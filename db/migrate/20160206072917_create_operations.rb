class CreateOperations < ActiveRecord::Migration
  def change
    create_table :operations do |t|
      t.string :title
      t.float :smv

      t.timestamps null: false
    end
  end
end
