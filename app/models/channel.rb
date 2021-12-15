class Channel < ApplicationRecord
    validates :name, presence: true, uniqueness: true 
    validates :dm, inclusion: {in: [true, false]}

    has_many :channel_members,
    foreign_key: :channel_id,
    class_name: :ChannelMember,
    dependent: :destroy 

    has_many :messages,
    foreign_key: :channel_id,
    class_name: :Message,
    dependent: :destroy 

    has_many :members,
    through: :channel_members,
    source: :member,
    dependent: :destroy 

    def self.get_channels_by_user(user)
        Channel.joins(:members).where('channel_members.member_id = ?', user.id)
    end 
end
