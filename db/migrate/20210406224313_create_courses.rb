class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :Course_ID
      t.integer :Catalog_ID
      t.string :Description
      t.string :Name
      t.integer :Credits

      t.timestamps
    end
  end
end
