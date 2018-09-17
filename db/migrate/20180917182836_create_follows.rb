class CreateFollows < ActiveRecord::Migration[5.2]
  def change
    create_table :follows do |t|
      t.integer :followed_user_id, null: false
      t.integer :follower_id, null: false
    end
    add_index :follows, :followed_user_id
    add_index :follows, :follower_id
    add_index :follows, [:followed_user_id, :follower_id], unique: true
  end
end
