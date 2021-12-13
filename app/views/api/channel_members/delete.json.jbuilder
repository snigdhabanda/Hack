json.channel_member do 
        json.partial! 'api/channel_members/channel_member', channel_member: @channel_member
    end 