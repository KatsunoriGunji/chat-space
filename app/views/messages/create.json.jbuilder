json.id @message.id
json.content @message.content
json.image @message.image.present? ? @message.image.url : ""
json.user_name User.find(@message.user_id).name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")