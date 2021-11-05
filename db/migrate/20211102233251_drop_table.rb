class DropTable < ActiveRecord::Migration[5.2]
  def down
    drop_table :create_channel_members
  end
end
