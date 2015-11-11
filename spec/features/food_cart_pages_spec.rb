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
    click_on 'Add a Food Cart'
    fill_in 'food_cart_name', with: 'Burger Truck'
    fill_in 'food_cart_address', with: '208 SW 5th Ave'
    check 'American'
    click_on 'Submit'
    expect(page).to(have_content('Burger Truck'))
  end
  it 'should allow a signed in user to delete a food cart', login: true, js:true do
    FactoryGirl.create(:food_cart)
    visit food_carts_path
    click_on 'Umai Ramen Cart'
    click_on 'Delete this Entry'
    expect(page).to_not(have_content('Umai Ramen Cart'))
  end
  it 'should allow a signed in user to edit a food cart entry', login: true, js:true do
    FactoryGirl.create(:food_cart)
    visit food_carts_path
    click_on 'Umai Ramen Cart'
    click_on 'Edit this Entry'
    sleep 2
    fill_in 'food_cart_name', with: 'that other ramen cart'
    click_on 'Submit'
    expect(page).to(have_content('that other ramen cart'))
  end
end
