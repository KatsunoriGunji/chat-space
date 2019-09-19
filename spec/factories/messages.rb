FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("public/uploads/message/image/14/image.png")}
    user
    group
  end
end