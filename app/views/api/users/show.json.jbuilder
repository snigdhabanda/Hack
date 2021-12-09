
json.partial! "api/users/user", user: @user

@channels.each do |channel| 
    json.channels do 
        json.set! channel.id do 
            json.partial! 'api/channels/channel', channel: channel
        end 
    end 
end
    