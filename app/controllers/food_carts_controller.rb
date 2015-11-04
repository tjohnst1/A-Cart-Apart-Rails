class FoodCartsController < ApplicationController
  before_action :find_food_cart, except: [:index, :new, :create]

  def index
    @food_carts = FoodCart.all
  end

  def show
  end

  def new
    @food_cart = FoodCart.new
    @tag = Tag.new
  end

  def create
    @food_cart = FoodCart.create(food_cart_params)
    @tag = Tag.create(tag_params)
    @tag.update_attribute(:food_cart_id, @food_cart.id)
    if @food_cart.persisted? && @tag.persisted?
      redirect_to food_carts_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @food_cart.update(food_cart_params)
      redirect_to food_carts_path
    else
      render :edit
    end
  end

  def destroy
    @food_cart.destroy
    redirect_to food_carts_path
  end

  private
    def food_cart_params
      params.require(:food_cart).permit(:name, :address, :zip, :phone_number, :website, :monday_hours,
                                        :tuesday_hours, :wednesday_hours, :thursday_hours,
                                        :friday_hours, :saturday_hours, :sunday_hours)
    end
    def tag_params
      params.require(:tag).permit(:name, :food_cart_id)
    end
    def find_food_cart
      @food_cart = FoodCart.find(params[:id])
    end
end
