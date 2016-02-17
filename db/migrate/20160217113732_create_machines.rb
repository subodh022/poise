class CreateMachines < ActiveRecord::Migration
  def change
    create_table :machines do |t|
      t.belongs_to :line, index: true
      t.string :name
      t.string :mac_id
      t.string :attachment
      t.integer :tot_units, default: 0
      t.integer :used_units, default: 0

      t.timestamps null: false
    end
  end
end
