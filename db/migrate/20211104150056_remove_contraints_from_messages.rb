class RemoveContraintsFromMessages < ActiveRecord::Migration[5.2]
  def change
    change_column_null :messages, :author_id, true
    change_column_null :messages, :recipient_id, true
  end
end
