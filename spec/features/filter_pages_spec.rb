require 'rails_helper'

describe 'filter pages' do
  it 'allows a user to filter food carts by category', js:true do
    visit food_carts_path
    click_on 'categories-header-link'
    page.find('#Japanese-filter').set(true)
    wait 2
    expect(page).to(have_content('Umai Ramen Cart'))
  end
  it 'allows a user to filter food carts by category', js:true do
    visit food_carts_path
    click_on '#categories-header-link'
    page.find('#Southern-filter').set(true)
    wait 2
    expect(page).to_not(have_content('Umai Ramen Cart'))
  end
end
