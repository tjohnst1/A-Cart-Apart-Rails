FactoryGirl.define do
  factory :user do
    username "testaccount"
    email "test@email.com"
    password "testpassword"
  end
  factory :food_cart do
    name 'Umai Ramen Cart'
    address 'SE 33rd Ave. & Hawthorne Blvd.'
    phone_number '1112223333'
    website 'http://umaipdx.com/'
    monday_hours '12pm - 3pm'
    tuesday_hours '12pm - 3pm'
    wednesday_hours '12pm - 3pm'
    thursday_hours '12pm - 3pm'
    friday_hours '12pm - 3pm'
    saturday_hours '12pm - 3pm'
    sunday_hours '12pm - 3pm'
  end
end
