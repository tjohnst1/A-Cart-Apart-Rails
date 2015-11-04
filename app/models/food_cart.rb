class FoodCart < ActiveRecord::Base
  validates :name, presence: true
  validates :address, presence: true
  validates :zip, presence: true
  validates :monday_hours, presence: true
  validates :tuesday_hours, presence: true
  validates :wednesday_hours, presence: true
  validates :thursday_hours, presence: true
  validates :friday_hours, presence: true
  validates :saturday_hours, presence: true
  validates :sunday_hours, presence: true
end
