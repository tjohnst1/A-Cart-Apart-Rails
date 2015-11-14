require 'rails_helper'

describe 'authentication pages' do
  before(:each, :login) do
    FactoryGirl.create(:user)
    visit food_carts_path
    click_on 'Log In'
    fill_in 'user_login', with: 'testaccount'
    fill_in 'user_password', with: 'testpassword'
    click_on 'Log in'
  end
  it 'allows a user to sign up for an account' do
    visit food_carts_path
    click_on 'Log In'
    click_on 'Need an Account?'
    fill_in 'user_username', with: 'firstspec'
    fill_in 'user_email', with: 'spec@email.com'
    fill_in 'user_password', with: 'specpassword'
    fill_in 'user_password_confirmation', with: 'specpassword'
    click_on 'Sign up'
    expect(page).to(have_content('Welcome! You have signed up successfully.'))
  end
  it 'allows a user to sign in with a e-mail address', js:true do
    FactoryGirl.create(:user)
    visit food_carts_path
    click_on 'Log In'
    fill_in 'user_login', with: 'test@email.com'
    fill_in 'user_password', with: 'testpassword'
    click_on 'Log in'
    expect(page).to(have_content('Signed in successfully.'))
  end
  it 'allows a user to sign in with a username', login: true, js:true do
    expect(page).to(have_content('Signed in successfully.'))
  end
  it 'allows a user to sign out', login: true, js:true do
    click_on 'Sign Out'
    expect(page).to(have_content('Signed out successfully.'))
  end
end
