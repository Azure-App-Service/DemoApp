# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170821093214) do

  create_table "message_read_records", force: :cascade do |t|
    t.integer "from"
    t.integer "to"
    t.integer "last_read_message_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["to", "from"], name: "index_message_read_records_on_to_and_from"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "from"
    t.integer "to"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id", "to", "from"], name: "index_messages_on_id_and_to_and_from"
  end

end
