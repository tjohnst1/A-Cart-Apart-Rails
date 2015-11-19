class ReviewsController < ApplicationController

  def new
    @food_cart = FoodCart.find(params[:food_cart_id])
    @review = Review.new
    respond_to do |format|
      format.js
      format.html
      format.json { render json: @review }
    end
  end

  def create
    @food_cart = FoodCart.find(params[:food_cart_id])
    @review = @food_cart.reviews.new(reviews_params)
    if @review.save
      respond_to do |format|
        format.js
        format.html
      end
    end
  end

  def destroy
    @review = FoodCart.find(params[:id])
  end

  private
    def reviews_params
      params.require(:review).permit(:content, :rating, :food_cart_id, :user_id)
    end

end
