class ReviewsController < ApplicationController
  before_action :find_review, except: [:new, :create]
  before_action :find_food_cart

  def new
    @review = Review.new
  end

  def create
    @review = @food_cart.reviews.new(review_params)
    if @review.save
      @review.update_attributes(user_id: current_user.id)
      respond_to do |format|
        format.js
        format.html
      end
    end
  end

  def edit
  end

  def update
    if @review.update(review_params)
      respond_to do |format|
        format.js
        format.html
      end
    end
  end

  def destroy
    @review.destroy
    respond_to do |format|
      format.js
      format.html { redirect_to food_carts_path }
    end
  end

  private
    def review_params
      params.require(:review).permit(:content, :rating, :food_cart_id, :user_id)
    end
    def find_review
      @review = Review.find(params[:id])
    end
    def find_food_cart
      @food_cart = FoodCart.find(params[:food_cart_id])
    end
end
