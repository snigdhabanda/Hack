class MessagesController < ApplicationController
    def show 
        @message = Message.find(params[:id])
        render :show 
    end 
end 