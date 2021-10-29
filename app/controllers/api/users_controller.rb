class Api::UsersController < ApplicationController
    
    #retrieve a single user
    def show 
        @user = User.find(params[:id])
        render :show 
    end 

    #create a new user in the database
    def create 
        @user = User.new(user_params)
        if @user.save 
            login!(@user)
            render :show 
        else 
            render json: @user.errors.full_messages 
    end 

    #require a user to enter following params
    def user_params 
        params.require(:user).permit(:email, :password, :display_name)
    end 

end