class CreateCategoryCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :category_courses do |t|
      t.references :category, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
