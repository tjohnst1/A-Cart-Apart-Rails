class FoodCartsController < ApplicationController
  before_action :find_food_cart, except: [:index, :new, :create]

  def index
    gon.searchCriteria = FoodCart.pluck(:name)
    gon.food_carts = FoodCart.text_search(params[:query])
    @food_carts = FoodCart.text_search(params[:query])
  end

  def show
  end

  def new
    @food_cart = FoodCart.new
    @tag = Tag.new
    @tags = Tag.all
    gon.tagList = Tag.pluck(:name)
    respond_to do |format|
      format.js
      format.html
    end
  end

  def create
    @food_cart = FoodCart.create(food_cart_params)
    @tag = @food_cart.tags.create(tag_params)
    if @food_cart.persisted? && @tag.persisted?
      respond_to do |format|
        format.js
        format.html { redirect_to food_carts_path }
      end
    else
      respond_to do |format|
        format.js
        format.html { render :new }
      end
    end
  end

  def edit
    @tag = @food_cart.tags
    @tags = Tag.all
  end

  def update
    if @food_cart.update(food_cart_params)
      respond_to do |format|
        format.js
        format.html { redirect_to food_carts_path }
      end
    else
      respond_to do |format|
        format.js
        format.html { render :edit }
      end
    end
  end

  def destroy
    @food_cart.destroy
    redirect_to food_carts_path
  end

  private
    def food_cart_params
      params.require(:food_cart).permit(:name, :address, :phone_number, :website, :monday_hours,
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
