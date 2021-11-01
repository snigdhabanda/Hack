class Dm < ApplicationRecord
    belongs_to :member,
    foreign_key: :dm_member_id,
    class_name: :User

    has_many :messages,
    foreign_key: :dm_id,
    class_name: :Message
end
