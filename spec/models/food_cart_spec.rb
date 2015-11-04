require 'rails_helper'

describe FoodCart do
  it { should validate_presence_of :name }
  it { should validate_presence_of :address }
  it { should validate_presence_of :zip }
  it { should validate_presence_of :monday_hours }
  it { should validate_presence_of :tuesday_hours }
  it { should validate_presence_of :tuesday_hours }
  it { should validate_presence_of :wednesday_hours }
  it { should validate_presence_of :thursday_hours }
  it { should validate_presence_of :friday_hours }
  it { should validate_presence_of :saturday_hours }
  it { should validate_presence_of :sunday_hours }
end
