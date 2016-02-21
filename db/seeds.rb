1000.times do
  title = Faker::Lorem.word
  Page.create(
    title: title.titleize,
    slug: title,
    content: Faker::Lorem.paragraphs(5).join("\n\n")
  )
end
