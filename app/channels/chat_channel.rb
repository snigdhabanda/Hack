class ChatChannel < ApplicationCable::Channel


  def subscribed
    # dynamically subscribing to a channel
    @channel = Channel.find(params[:id])
    stream_for @channel
  end

  def speak(data)
    #saving a message with params and broadcasting to a socket
    message = Message.new(body: data['message'], author_id: data['id'], channel_id: data['channelId'])
    if message.save
      socket = { message: message.body, type: 'createMessage', id: message.id, author_id: message.author_id, channel_id: message.channel_id, created_at: message.created_at}
      ChatChannel.broadcast_to(@channel, socket)
    end
  end

  def reply(data)
    message = Message.new(body: data['message'], author_id: data['id'], channel_id: data['channelId'], parent_message_id: data['parentMessageId'])
    if message.save
      socket = { message: message.body, type: 'replyMessage', id: message.id, author_id: message.author_id, channel_id: message.channel_id, created_at: message.created_at, parent_message_id: message.parent_message_id}
      ChatChannel.broadcast_to(@channel, socket)
    end
  end

  def update(data)
    if Message.update(data['id'], body: data['message'], author_id: data['authorId'], channel_id: data['channelId'])
      message = Message.find(data['id'])
      socket = { message: message.body, type: 'createMessage', id: message.id, author_id: message.author_id, channel_id: message.channel_id, created_at: message.created_at}
      ChatChannel.broadcast_to(@channel, socket)
    end
  end 

  def delete(data)
    message = Message.find(data['message']['id'])
    if message.destroy
      socket = { type: 'deleteMessage', message: message}
      ChatChannel.broadcast_to(@channel, socket)
    end 
  end 


  
  def unsubscribed()
  end

  

end