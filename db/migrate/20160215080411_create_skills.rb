class CreateSkills < ActiveRecord::Migration
  def change
    create_table :skills do |t|
      t.belongs_to :operator, index: true
      t.belongs_to :operation, index: true
      t.integer :value

      t.timestamps null: false
    end
  end
end
