require 'rails_helper'

describe 'authentication pages' do
  it 'allows a user to sign up for an account' do
    visit food_carts_path
    click_on 'Sign Up'
    fill_in 'user_username', with: 'testname'
    fill_in 'user_email', with: 'test@email.com'
    fill_in 'user_password', with: 'testpassword'
    fill_in 'user_password_confirmation', with: 'testpassword'
    click_on 'Sign up'
    expect(page).to(have_content('Welcome! You have signed up successfully.'))
  end
  it 'allows a user to sign in with an e-mail address' do
    
    visit food_carts_path
    click_on 'Sign In'
    fill_in 'user_email', with: 'test@email.com'
    fill_in 'user_password', with: 'testpassword'
    click_on 'Sign up'
    expect(page).to(have_content('Blah'))
  end
end
