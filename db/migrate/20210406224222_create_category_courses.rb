class CreateCategoryCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :category_courses do |t|
      t.integer :Category_ID
      t.string :Course_ID

      t.timestamps
    end
  end
end
