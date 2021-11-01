class Channel < ApplicationRecord
    validates :name, :creator_id, :member_id, presence: true 

    belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

    belongs_to :member,
    foreign_key: :channel_member_id,
    class_name: :User

    has_many :messages,
    foreign_key: :channeL_id,
    class_name: :Message 
end
