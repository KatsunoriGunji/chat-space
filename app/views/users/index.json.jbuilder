json.users do
  json.array!(@users) do |user|
    json.extract! user, :id, :name
  end
end

json.user do
  json.id @user_id
  json.name @user_name
end