class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.references :catalog, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.integer :credits
      t.string :designator

      t.timestamps
    end
  end
end
