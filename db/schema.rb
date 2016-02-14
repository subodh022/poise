# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160211180711) do

  create_table "lines", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.integer  "capacity",   limit: 4,   default: 0
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "operations", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.float    "smv",        limit: 24
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "operators", force: :cascade do |t|
    t.integer  "line_id",    limit: 4
    t.string   "emp_name",   limit: 255
    t.integer  "emp_id",     limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "operators", ["line_id"], name: "index_operators_on_line_id", using: :btree

  create_table "sections", force: :cascade do |t|
    t.integer  "line_id",    limit: 4
    t.string   "name",       limit: 255
    t.boolean  "enabled",    limit: 1
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "sections", ["line_id"], name: "index_sections_on_line_id", using: :btree

end
