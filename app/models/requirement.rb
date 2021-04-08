class Requirement < ApplicationRecord
  belongs_to :catalog
  belongs_to :major
  belongs_to :category
end
