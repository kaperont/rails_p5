class Plan < ApplicationRecord
    belongs_to(:user)
    has_many :plan_courses
    has_many :course, through: :plan_course
end
