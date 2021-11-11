class Api::ChannelMembersController < ApplicationController

    def create
        @channel_member = ChannelMember.new(channel_member_params) 
        if @channel_member.save
            render "/api/channel_members/show"
        else 
            render json: @channel_member.errors.full_messages
        end  
    end 

    def channel_member_params 
        params.require(:channel_member).permit(:channel_id, :member_id, :creator)
    end 
end
