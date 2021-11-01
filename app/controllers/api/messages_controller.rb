class Api::MessagesController < ApplicationController
    
    def index 
        @messages = Message.all 
    end 

    def create
        @message = Message.new(message_params)
        if @message.save
            render "api/messages/show"
        else 
            render json: @message.errors.full_messages
        end  

    end 

    def update
        @message = Message.find(params[:id])
        if @message.update
            render :show
        else 
            @message.errors.full_messages
        end  

    end 


    def destroy 
        @message = Message.find(params[:id])
        @message.destroy!
    end 

    def message_params
        params.require(:message).permit(:body, :author_id, :recipient_id)
    end 

   
end
