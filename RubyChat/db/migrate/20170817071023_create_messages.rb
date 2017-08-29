class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.integer :from
      t.integer :to
      t.text :body

      t.timestamps
    end
  end
end
