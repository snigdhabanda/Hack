class Api::SessionsController < ApplicationController

    def create 
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user 
            login!(@user)
            @channels = Channel.get_channels_by_user(@user)
            render "api/users/show" 
        else 
            render json: ["Invalid login credentials"], status: 401
        end 
    end 

    def destroy 
        @user = current_user
        if @user
            logout
            render "api/users/delete"
        else
            render json: ["Nobody signed in"], status: 404
        end
    end 
end
