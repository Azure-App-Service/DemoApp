class CreateMessageReadRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :message_read_records do |t|
      t.integer :from
      t.integer :to
      t.integer :last_read_message_id

      t.timestamps
    end
  end
end
