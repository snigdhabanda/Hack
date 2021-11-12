# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

class ChatChannel < ApplicationCable::Channel

```ruby
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
```

  

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
