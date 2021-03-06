# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Database design of ChatSpace
## users table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: users_groups

## groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: users_groups

## users_groups table
|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true, null: false|
|group_id|references|foreign_key: true, null: false|
### Association
- belongs_to :user
- belongs_to :group

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|foreign_key: true, null: false|
|group_id|references|foreign_key: true, null: false|
### Association
- belongs_to :user
- belongs_to :group