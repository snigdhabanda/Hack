class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.integer :parent_message_id 
      t.integer :author_id, null: false
      t.integer :recipient_id, null: false
      t.integer :channel_id
      t.integer :dm_id

      t.timestamps
    end
    add_index :messages, :author_id
    add_index :messages, :recipient_id
  end
end
