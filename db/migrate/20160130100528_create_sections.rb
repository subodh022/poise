class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.belongs_to :line, index: true
      t.string :name
      t.boolean :enabled

      t.timestamps null: false
    end
  end
end