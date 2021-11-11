class Api::ChannelsController < ApplicationController
    def index
        @channels = Channel.all
        render "api/channels/index"
    end 

    def show
        @channel = Channel.find(params[:id])
        render "api/channels/show" 
    end 

    def create 
        @channel = Channel.new(channel_params)
        if @channel.save 
            render "api/channels/show"
        else
            render json: @channel.errors.full_messages 
        end 
    end 

    def destroy 
        @channel = Channel.find(params[:id])
        @channel.destroy! 
    end 

    def update 
    end 

    def channel_params 
        params.require(:channel).permit(:name, :description, :dm)
    end 


    
end
