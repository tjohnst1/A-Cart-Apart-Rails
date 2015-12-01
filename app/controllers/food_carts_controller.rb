class FoodCartsController < ApplicationController
  before_action :find_food_cart, except: [:index, :new, :create, :account]

  def index
    gon.searchCriteria = FoodCart.pluck(:name)
    gon.selectedFilter = params[:query]
    @food_carts = FoodCart.all
    @tags = Tag.all.sort { |x, y| x.name <=> y.name }
    gon.rabl as: 'food_carts'
    respond_to do |format|
      format.html
      format.json
    end
  end

  def show
    @tags = @food_cart.tag_list
    @reviews = @food_cart.reviews
  end

  def new
    @food_cart = FoodCart.new
    gon.tagList = Tag.pluck(:name)
    @tags = Tag.all.sort { |x, y| x.name <=> y.name }
    respond_to do |format|
      format.js
      format.html
    end
  end

  def create
    @food_cart = FoodCart.new(food_cart_params)
    @food_cart.tag_list.add(food_cart_params[:tag_list].split(','))
    if @food_cart.save
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

  def account
    @food_carts = FoodCart.all
  end

  private
    def food_cart_params
      params[:food_cart][:tag_list] ||= []
      params.require(:food_cart).permit(:name, :address, :phone_number, :website, :monday_hours,
                                        :tuesday_hours, :wednesday_hours, :thursday_hours,
                                        :friday_hours, :saturday_hours, :sunday_hours, tag_list: [])
    end
    def tag_params
      params.require(:tag).permit(:name, :food_cart_id)
    end
    def find_food_cart
      @food_cart = FoodCart.find(params[:id])
    end
end
