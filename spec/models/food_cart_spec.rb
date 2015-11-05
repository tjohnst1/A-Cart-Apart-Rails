require 'rails_helper'

describe FoodCart do
  it { should validate_presence_of :name }
  it { should validate_presence_of :address }
  it { should have_many :reviews }
  it { should have_many :tags }
end
