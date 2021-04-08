class Plan < ApplicationRecord
    belongs_to :user
    belongs_to :catalog
    belongs_to :major

    has_many :plan_courses
    has_many :courses, through: :plan_courses
    has_many :requirements
end
