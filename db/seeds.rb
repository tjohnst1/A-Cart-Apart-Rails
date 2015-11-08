# Accounts
User.create({username: 'test', email: 'test@test.com', password: 'password'})

# Food Carts
foodCarts = [
["Umai Ramen Cart", "SE 33rd Ave. & Hawthorne Blvd.", "Not Provided", "http://umaipdx.com/", "Closed", "Closed", "12pm - 3pm", "12pm - 3pm and 5pm - 8pm", "12pm - 3pm and 5pm - 8pm", "12pm - 3pm and 5pm - 8pm", "12pm - 3pm and 5pm - 8pm"],
["The 9", "510 Southeast Martin Luther King Junior Boulevard", "415-335-8475", "https://www.facebook.com/pages/The-9-Food-and-Drink/898649180197745?fref=ts", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm", "11 am - 5 pm"],
["Polli-Tico", "1112 SE Tacoma Street", "971-258-2845", "http://www.polli-tico.com/", "11:00am - 8pm", "11:00am - 8pm", "11:00am - 8pm", "11:00am - 8pm", "11:00am - 8pm", "12:00pm - 8pm", "12:00pm - 5pm"],
["Neue Southern PDX", "3121 SW Moody Ave", "Not Provided", "http://www.neuesouthernpdx.com/", "11:30am - 3:30pm", "11:30am - 3:30pm and 5:30pm - 8:30pm", "11:30am - 3:30pm", "11:30am - 3:30pm and 5:30pm - 8:30pm", "Closed", "12:00pm - 4:00pm"],
["Kingsland Kitchen", "SW Oak & 5th", "971-300-3118", "http://kingslandkitchen.com/", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "8:00 am-3:00 pm", "Closed", "Closed"],
["Juniper", "3121 S.W. Moody Ave.", "Not Provided", "http://www.juniperpdx.com/", "8:00am - 2:00pm", "8:00am - 2:00pm", "8:00am - 2:00pm", "8:00am - 2:00pm", "8:00am - 2:00pm", "11:00am - 2:00pm", "Closed"],
["DesiPDX", "1477 Northeast Alberta Street", "Not Provided", "http://www.desipdx.com/", "Closed", "Closed", "Closed", "11:30am - 8:00pm", "11:30pm - 8:30pm", "11:30pm - 8:30pm", "11:30am - 7:30pm"],
]

foodCarts.each do |name, address, phone_number, website, monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours, saturday_hours, sunday_hours|
  FoodCart.create({name: name, address: address, phone_number: phone_number, website: website, monday_hours: monday_hours, tuesday_hours: tuesday_hours, wednesday_hours: wednesday_hours, thursday_hours: thursday_hours, friday_hours: friday_hours, saturday_hours: saturday_hours, sunday_hours: sunday_hours})
end

tags = [
 "Afghan", "African", "Albanian", "American", "Argentinian", "Asian", "Australian", "Austrian", "Bagels", "Bakery",
 "BBQ", "Belgian", "Brazilian", "Breakfast", "British", "Burmese", "Cajun", "Californian", "Calzones", "Cambodian",
 "Cantonese", "Caribbean", "Cheesesteaks", "Chicken", "Chili", "Chinese", "Classic", "Coffee and Tea", "Colombian",
 "Costa Rican", "Crepes", "Cuban", "Deli", "Dessert", "Dim Sum", "Diner", "Dinner", "Dominican", "Eclectic",
 "Ecuadorian", "Egyptian", "El Salvadoran", "Empanadas", "English", "Ethiopian", "Filipino", "French", "Fresh Fruits",
 "Frozen Yogurt", "German", "Gluten-Free", "Greek", "Grill", "Guatemalan", "Gyro", "Haitian", "Halal",
 "Hamburgers", "Hawaiian", "Hot Dogs", "Ice Cream", "Indian", "Indonesian", "Irish", "Italian", "Jamaican", "Japanese",
 "Korean", "Kosher", "Latin American", "Lebanese", "Malaysian", "Mandarin", "Mediterranean", "Mexican", "Middle Eastern",
 "Mongolian", "Moroccan", "Nepalese", "New American", "Noodles", "Organic", "Pakistani", "Pasta", "Persian", "Peruvian",
 "Pitas", "Pizza", "Polish", "Portuguese", "Puerto Rican", "Ribs", "Russian", "Salads", "Sandwiches", "Scandinavian",
 "Seafood", "Senegalese", "Shakes", "Smoothies and Juices", "Soul Food", "Soup", "South African", "South American",
 "Southern", "Southwestern", "Spanish", "Steak", "Subs", "Sushi", "Szechwan", "Taiwanese", "Tapas", "Tex-Mex", "Thai",
 "Tibetan", "Turkish", "Ukrainian", "Vegan", "Vegetarian", "Venezuelan", "Vietnamese", "Wings", "Wraps"
]

tags.each do |tag|
  Tag.create(name: tag)
end
