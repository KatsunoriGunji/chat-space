json.users do
  json.array!(@users) do |user|
    json.extract! user, :id, :name
  end
end

json.user do
  json.id params[:user_id]
  json.name params[:user_name]
end