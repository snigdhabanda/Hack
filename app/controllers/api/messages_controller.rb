class Api::MessagesController < ApplicationController
    
    def index 
        @messages = Message.get_by_channel(channel_id) 
    end 

    def create
        # @message = Message.new(message_params)
        # if message.save
        #     render "api/messages/show"
        # else 
        #     render json: @message.errors.full_messages
        # end  

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
        params.require(:message).permit(:body, :author_id, :channel_id)
    end 

    def params 
        params[:parent_message_id]
    end 

   
end
