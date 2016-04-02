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

ActiveRecord::Schema.define(version: 20160402034044) do

  create_table "attendances", force: :cascade do |t|
    t.integer  "work_station_id", limit: 4
    t.boolean  "present",         limit: 1, default: true
    t.datetime "logged_at"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  add_index "attendances", ["work_station_id"], name: "index_attendances_on_work_station_id", using: :btree

  create_table "hourly_outputs", force: :cascade do |t|
    t.integer  "work_station_id", limit: 4
    t.integer  "output",          limit: 4
    t.datetime "logged_at"
    t.string   "remarks",         limit: 255
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "hourly_outputs", ["work_station_id"], name: "index_hourly_outputs_on_work_station_id", using: :btree

  create_table "lines", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.integer  "capacity",   limit: 4,   default: 0
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "machine_downtimes", force: :cascade do |t|
    t.integer  "work_station_id", limit: 4
    t.integer  "downtime",        limit: 4
    t.datetime "logged_at"
    t.string   "remarks",         limit: 255
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "machine_downtimes", ["work_station_id"], name: "index_machine_downtimes_on_work_station_id", using: :btree

  create_table "machines", force: :cascade do |t|
    t.integer  "line_id",    limit: 4
    t.string   "name",       limit: 255
    t.string   "mac_id",     limit: 255
    t.string   "attachment", limit: 255
    t.integer  "tot_units",  limit: 4,   default: 0
    t.integer  "used_units", limit: 4,   default: 0
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  add_index "machines", ["line_id"], name: "index_machines_on_line_id", using: :btree

  create_table "op_reworks", force: :cascade do |t|
    t.integer  "work_station_id", limit: 4
    t.integer  "rework",          limit: 4
    t.datetime "logged_at"
    t.string   "remarks",         limit: 255
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "op_reworks", ["work_station_id"], name: "index_op_reworks_on_work_station_id", using: :btree

  create_table "operation_bulletins", force: :cascade do |t|
    t.integer  "line_id",    limit: 4
    t.string   "style",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.float    "takt_time",  limit: 24
  end

  add_index "operation_bulletins", ["line_id"], name: "index_operation_bulletins_on_line_id", using: :btree

  create_table "operations", force: :cascade do |t|
    t.string   "title",        limit: 255
    t.float    "smv",          limit: 24
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "section_name", limit: 255
    t.float    "dhu",          limit: 24,  default: 0.0
  end

  create_table "operators", force: :cascade do |t|
    t.integer  "line_id",    limit: 4
    t.string   "emp_name",   limit: 255
    t.integer  "emp_id",     limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "section_id", limit: 4
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

  create_table "skills", force: :cascade do |t|
    t.integer  "operator_id",  limit: 4
    t.integer  "operation_id", limit: 4
    t.integer  "value",        limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "skills", ["operation_id"], name: "index_skills_on_operation_id", using: :btree
  add_index "skills", ["operator_id"], name: "index_skills_on_operator_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "name",                   limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "work_stations", force: :cascade do |t|
    t.integer  "operation_bulletin_id", limit: 4
    t.integer  "section_id",            limit: 4
    t.integer  "operation_id",          limit: 4
    t.integer  "machine_id",            limit: 4
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "work_stations", ["machine_id"], name: "index_work_stations_on_machine_id", using: :btree
  add_index "work_stations", ["operation_bulletin_id"], name: "index_work_stations_on_operation_bulletin_id", using: :btree
  add_index "work_stations", ["operation_id"], name: "index_work_stations_on_operation_id", using: :btree
  add_index "work_stations", ["section_id"], name: "index_work_stations_on_section_id", using: :btree

  create_table "workstation_operators", force: :cascade do |t|
    t.integer  "work_station_id", limit: 4
    t.integer  "operator_id",     limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "workstation_operators", ["operator_id"], name: "index_workstation_operators_on_operator_id", using: :btree
  add_index "workstation_operators", ["work_station_id"], name: "index_workstation_operators_on_work_station_id", using: :btree

end
