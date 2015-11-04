class Review < ActiveRecord::Base
  validates :content, presence: true
  validates :rating, presence: true
end
