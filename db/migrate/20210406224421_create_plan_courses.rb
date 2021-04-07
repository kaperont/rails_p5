class CreatePlanCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :plan_courses do |t|
      t.integer :Plan_ID
      t.string :Course_ID
      t.integer :Year
      t.string :Term

      t.timestamps
    end
  end
end
