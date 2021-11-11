class UpdateChannels < ActiveRecord::Migration[5.2]
  def change
    remove_column :channels, :creator_id
    remove_column :channels, :member_id 
  end
end
