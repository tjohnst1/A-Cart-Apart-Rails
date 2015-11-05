# Accounts
User.create({username: 'test', email: 'test@test.com', password: 'password'})

# Food Carts
foodCarts = [
["Umai Ramen Cart", "SE 33rd Ave. & Hawthorne Blvd.", "http://umaipdx.com/", "", "", "12pm - 3pm", "12pm - 3pm and 5pm - 8pm", "12pm - 3pm and 5pm - 8pm", "12pm - 3pm and 5pm - 8pm", "12pm - 3pm and 5pm - 8pm"],
["The 9", "510 Southeast Martin Luther King Junior Boulevard", "415-335-8475", "https://www.facebook.com/pages/The-9-Food-and-Drink/898649180197745?fref=ts", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm"],
["Polli-Tico", "1112 SE Tacoma Street", "971-258-2845", "http://www.polli-tico.com/", "11:00am - 8pm", "11:00am - 8pm", "11:00am - 8pm", "11:00am - 8pm", "11:00am - 8pm", "12:00pm - 8pm", "12:00pm - 5pm"],
["Neue Southern PDX", "3121 SW Moody Ave", "", "http://www.neuesouthernpdx.com/", "11:30am - 3:30pm", "11:30am - 3:30pm and 5:30pm - 8:30pm", "11:30am - 3:30pm", "11:30am - 3:30pm and 5:30pm - 8:30pm", "", "12:00pm - 4:00pm"],
["Kingsland Kitchen", "SW Oak & 5th", "971-300-3118", "http://kingslandkitchen.com/", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "", ""],
["Juniper", "3121 S.W. Moody Ave.", "", "http://www.juniperpdx.com/", "8:00am - 2:00pm", "8:00am - 2:00pm", "8:00am - 2:00pm", "8:00am - 2:00pm", "8:00am - 2:00pm", "11:00am - 2:00pm", ""],
["DesiPDX", "1477 Northeast Alberta Street", "", "http://www.desipdx.com/", "", "", "", "11:30am - 8:00pm", "11:30pm - 8:30pm", "11:30pm - 8:30pm", "11:30am - 7:30pm"],
]

foodCarts.each do |name, address, website, monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours, saturday_hours, sunday_hours|
  FoodCart.create({name: name, address: address, website: website, monday_hours: monday_hours, tuesday_hours: tuesday_hours, wednesday_hours: wednesday_hours, thursday_hours: thursday_hours, friday_hours: friday_hours, saturday_hours: saturday_hours, sunday_hours: sunday_hours})
end
