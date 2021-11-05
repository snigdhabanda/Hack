class ChannelMember < ApplicationRecord
    validates :member_id, :channel_id, presence: true 
    validates :creator, inclusion: {in: [true, false]}

    belongs_to :member,
    foreign_key: :member_id,
    class_name: :User

    belongs_to :channel,
    foreign_key: :channel_id,
    class_name: :Channel
end