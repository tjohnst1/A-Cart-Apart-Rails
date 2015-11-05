require 'rails_helper'

describe 'food cart pages' do
  before(:each, :login) do
    FactoryGirl.create(:user)
    visit food_carts_path
    click_on 'Sign In'
    fill_in 'user_login', with: 'test@email.com'
    fill_in 'user_password', with: 'testpassword'
    click_button 'Log in'
  end
  it 'should allow a signed in user to add a food cart', login:true, js:true do
    visit food_carts_path
    fill_in 'food_cart_name', with: 'Burger Truck'
    fill_in 'food_cart_address', with: '208 SW 5th Ave'
    fill_in 'tag_name', with: 'burgers'
    click_on 'Submit'
    expect(page).to(have_content('Burger Truck'))
  end

end
