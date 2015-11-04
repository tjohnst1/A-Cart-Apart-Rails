require 'rails_helper'

describe Tag do
  it { should belong_to :user }
  it { should belong_to :food_cart }
  it { should validate_presence_of :name }
end
