class Message < ApplicationRecord
    validates :body, :author_id, presence: true 
    # validates :dm_id, presence: true, unless: :channel_id
    # validates :channel_id, presence: true, unless: :dm_id

    belongs_to :author, 
    foreign_key: :author_id,
    class_name: :User
    
    belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User

    # belongs_to :parent_message,
    # foreign_key: :parent_message_id,
    # class_name: :Message 

    # has_many :replies,
    # foreign_key: :parent_message_id, 
    # class_name: :Message 

    # belongs_to :channel,
    # foreign_key: :channel_id,
    # class_name: :Channel

    # belongs_to :dm,
    # foreign_key: :dm_id,
    # class_name: :Dm

    def self.filter_messages
        # author_id matches current_user id 
        # get replies function
        # add parent_message id to array (shift)
        # base case: parent_message_id: nill 
        #merge sort recipient id and author id arrays 
        # recipient id matches current user id 
        # pluck into array 

        # user_messages = Message.where('current_user.id = author_id OR current_user.id = recipient_id')
        
        # replies = Hash.new {|hash, key| hash[key] = []}
        # user_messages.each do |message|
        #     replies[message.parent_message_id] << message
        # end 

        # replies.keys


    end 

    # def get_replies(message = nil) 
    #     if message 
    #         replies = [message]
    #     else 
    #         replies = []
    #     end 
    
    #     self.each do |message| 
    #         if message.parent_message_id == nil 
    #             return []
    #         else 
    #             replies += get_replies(message)
    #         end
    #     end 
    #     replies; 
    # end 
end
