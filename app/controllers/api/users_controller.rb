class Api::UsersController < ApplicationController

    # skip_before_action :verify_authenticity_token
    
    before_action :require_logged_in, only: [:show, :index]

    def index 
        @users = User.search(params[:search])
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
            @channel_member = ChannelMember.create({channel_id: 203, member_id: @user.id, creator: false})
            # @channel_member.save!
            @channel_member2 = ChannelMember.create({channel_id: 204, member_id: @user.id, creator: false})
            # @channel_member2.save!
            @channel_member3 = ChannelMember.create({channel_id: 205, member_id: @user.id, creator: false})
            @channel_member4 = ChannelMember.create({channel_id: 206, member_id: @user.id, creator: false})
            @channel_member5 = ChannelMember.create({channel_id: 207, member_id: @user.id, creator: false})
            @channels = Channel.get_channels_by_user(@user)
            render "api/users/show" 
        else 
            render json: @user.errors.full_messages, status: 422 
        end 
    end 

    def update 
        @user = User.find(params[:id])
        if @user.update(user_params)
            render "api/users/edit" 
        else 
            render json: ["That email has already been taken"], status: 400
        end 

    end 

    #require a user to enter following params
    def user_params 
        params.require(:user).permit(:email, :password, :display_name, :image_url, :search)
    end 

end
