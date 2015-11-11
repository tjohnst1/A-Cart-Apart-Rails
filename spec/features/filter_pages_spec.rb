require 'rails_helper'

describe 'filter pages' do
  it 'allows a user to filter food carts by category' do
    visit food_carts_path
    check 'Japanese'
    wait 2
    expect(page).to(have_content('Umai Ramen Cart'))
  end
  it 'allows a user to filter food carts by category' do
    visit food_carts_path
    check 'Southern'
    wait 2
    expect(page).to_not(have_content('Umai Ramen Cart'))
  end
end
