class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :title
      t.integer :capacity, default: 0

      t.timestamps null: false
    end
  end
end