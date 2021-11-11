class RemoveNullContraintFromMessagesChannelId < ActiveRecord::Migration[5.2]
  def change
    change_column_null :messages, :channel_id, false
  end
end
