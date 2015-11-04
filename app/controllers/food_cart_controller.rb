class FoodCartsController < ApplicationController
  def index
  end
  
  def new
    @food_cart = FoodCart.new
    @tag = Tag.new
  end

  def create
    @food_cart = FoodCart.new(food_cart_params)
    @tag = Tag.new(tag_params)
    @tag['food_cart_id'] = @food_cart.id
    if @food_cart.save && @tag.save
      redirect_to food_carts_path
    else
      render :new
    end
  end

  private
    def food_cart_params
      params.require(:food_cart).permit(:name, :address, :zip, :phone_number, :website, :monday_hours,
                                        :tuesday_hours, :wednesday_hours, :thursday_hours,
                                        :friday_hours, :saturday_hours, :sunday_hours)
    end
    def tag_params
      params.require(:tags).permit(:name, :food_cart_id)
    end
end
