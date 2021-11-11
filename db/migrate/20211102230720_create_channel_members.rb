class CreateChannelMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_members do |t|
      t.integer :channel_id, null: false
      t.integer :member_id, null: false 
      t.boolean :creator, null: false 
      t.timestamps
    end
    add_index :channel_members, [:member_id, :channel_id]
  end
end
