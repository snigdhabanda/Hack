class Api::UsersController < ApplicationController

    # skip_before_action :verify_authenticity_token
    
    before_action :require_logged_in, only: [:show]

    #retrieve a single user
    def show 
        @user = User.find(params[:id])
        render "api/users/show" 
    end 

    #create a new user in the database
    def create 
        @user = User.new(user_params)
        if @user.save 
            login!(@user)
            render "api/users/show" 
        else 
            render json: @user.errors.full_messages, status: 422 
        end 
    end 

    #require a user to enter following params
    def user_params 
        params.require(:user).permit(:email, :password, :display_name, :image_url)
    end 

end
