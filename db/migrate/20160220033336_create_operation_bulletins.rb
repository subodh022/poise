class CreateOperationBulletins < ActiveRecord::Migration
  def change
    create_table :operation_bulletins do |t|
      t.belongs_to :line, index: true
      t.string :style

      t.timestamps null: false
    end
  end
end
