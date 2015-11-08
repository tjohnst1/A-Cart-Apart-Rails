class Tag < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :food_cart
  belongs_to :user

end
