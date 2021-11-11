class Channel < ApplicationRecord
    validates :name, presence: true 
    validates :dm, inclusion: {in: [true, false]}

    has_many :channel_members,
    foreign_key: :channel_id,
    class_name: :ChannelMember

    has_many :messages,
    foreign_key: :channel_id,
    class_name: :Message,
    dependent: :destroy 

    def self.get_channels_by_user(current_user)
        Channel.joins(:channel_members).where('channel_members.member_id = ?', current_user.id)
    end 
end
