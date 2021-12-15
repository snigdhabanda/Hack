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
            render json: ["That channel name has already been taken"], status: 400
        end 
    end 

    def destroy 
        @channel = Channel.find(params[:id])
        @channel.destroy! 
        render "api/channels/delete" 
    end 

    def update 
        @channel = Channel.find(params[:id])
        puts @channel
        if @channel.update(channel_params)
            render "api/channels/show"
        else 
            render json: ["That channel name has already been taken"], status: 400
        end 
    end 

    def channel_params 
        params.require(:channel).permit(:name, :topic, :description, :dm)
    end 


    
end
