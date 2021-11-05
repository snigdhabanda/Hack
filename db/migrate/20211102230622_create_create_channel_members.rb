class CreateCreateChannelMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :create_channel_members do |t|

      t.timestamps
    end
  end
end
