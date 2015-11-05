require 'rails_helper'

describe 'search function' do
  it 'returns a list of search results', js: true do
    FactoryGirl.create(:food_cart)
    FactoryGirl.create(:food_cart, name: 'Kingsland Kitchen', address: 'SW Oak & 5th')
    FactoryGirl.create(:food_cart, name: 'Juniper', address: '3121 S.W. Moody Ave.')
    visit food_carts_path
    fill_in :query, with: 'Umai'
    click_button 'Search'
    save_and_open_screenshot
    expect(page).to(have_content('Umai'))
    expect(page).to_not(have_content('Juniper'))
  end
end
