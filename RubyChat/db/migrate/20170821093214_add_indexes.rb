class AddIndexes < ActiveRecord::Migration[5.1]
  def change
    add_index :messages, [:id, :to, :from]
    add_index :message_read_records, [:to, :from]
  end
end