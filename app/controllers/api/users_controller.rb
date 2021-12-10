class Api::UsersController < ApplicationController

    # skip_before_action :verify_authenticity_token
    
    before_action :require_logged_in, only: [:show, :index]

    def index 
        @users = User.all
        render "api/users/index" 
    end 

    #retrieve a single user
    def show 
        @user = User.find(params[:id])
        @channels = Channel.get_channels_by_user(@user)
        render "api/users/show" 
    end 

    #create a new user in the database
    def create 
        @user = User.new(user_params)
        if @user.save 
            login!(@user)
            @channel_member = ChannelMember.create({channel_id: 120, member_id: @user.id, creator: false})
            @channel_member.save!
            @channel_member2 = ChannelMember.create({channel_id: 130, member_id: @user.id, creator: false})
            @channel_member2.save!
            @channels = Channel.get_channels_by_user(@user)
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
