    
    json.channel do 
        json.partial! 'api/channels/channel', channel: @channel
    end 
    

    @channel.messages.each do |message| 
        json.messages do 
            json.set! message.id do 
                json.partial! 'api/messages/message', message: message 
            end 
        end 
    end 

    @channel.channel_members.each do |channel_member| 
        json.channel_members do 
            json.set! channel_member.id do 
                json.partial! 'api/channel_members/channel_member', channel_member: channel_member 
            end 
        end 
    end  