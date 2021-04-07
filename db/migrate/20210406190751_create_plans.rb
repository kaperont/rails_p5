class CreatePlans < ActiveRecord::Migration[6.1]
  def change
    create_table :plans do |t|
      t.string :Courses
      t.string :Name
      t.string :User
      t.integer :Major_ID
      t.integer :Catalog_ID
      t.integer :Current_Year
      t.string :Current_Semester

      t.timestamps
    end
  end
end
