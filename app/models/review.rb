class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :food_cart
  validates :content, presence: true
  validates :rating, presence: true
end
