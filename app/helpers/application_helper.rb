module ApplicationHelper
  def flashToAlertClass(key)
    case key
      when "message"
        "alert-success"
      when "warning"
        "alert-danger"
      else
        "alert-info"
      end
  end
  def current_categories
    [
     "Afghan", "African", "Albanian", "American", "Argentinian", "Asian", "Australian", "Austrian", "Bagels", "Bakery",
     "BBQ", "Belgian", "Brazilian", "Breakfast", "British", "Burmese", "Cajun", "Californian", "Calzones", "Cambodian",
     "Cantonese", "Caribbean", "Cheesesteaks", "Chicken", "Chili", "Chinese", "Classic", "Coffee and Tea", "Colombian",
     "Costa Rican", "Crepes", "Cuban", "Deli", "Dessert", "Dim Sum", "Diner", "Dinner", "Dominican", "Eclectic",
     "Ecuadorian", "Egyptian", "El Salvadoran", "Empanadas", "English", "Ethiopian", "Filipino", "French", "Fresh Fruits",
     "Frozen Yogurt", "German", "Gluten-Free", "Greek", "Grill", "Guatemalan", "Gyro", "Haitian", "Halal",
     "Hamburgers", "Hawaiian", "Hot Dogs", "Ice Cream", "Indian", "Indonesian", "Irish", "Italian", "Jamaican", "Japanese",
     "Korean", "Kosher", "Latin American", "Lebanese", "Malaysian", "Mandarin", "Mediterranean", "Mexican", "Middle Eastern",
     "Mongolian", "Moroccan", "Nepalese", "New American", "Noodles", "Organic", "Pakistani", "Pasta", "Persian", "Peruvian",
     "Pitas", "Pizza", "Polish", "Portuguese", "Puerto Rican", "Ramen",  "Ribs", "Russian", "Salads", "Sandwiches", "Scandinavian",
     "Seafood", "Senegalese", "Shakes", "Smoothies and Juices", "Soul Food", "Soup", "South African", "South American",
     "Southern", "Southwestern", "Spanish", "Steak", "Subs", "Sushi", "Szechwan", "Taiwanese", "Tapas", "Tex-Mex", "Thai",
     "Tibetan", "Turkish", "Ukrainian", "Vegan", "Vegetarian", "Venezuelan", "Vietnamese", "Wings", "Wraps"
    ]
  end
  
end
