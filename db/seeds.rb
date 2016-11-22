# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Event.destroy_all

User.create!([{
  email: "sampleofficer@gmail.com",
  major: "EECS",
  password: "Dummyofficer123!",
  sign_in_count: 0,
  name: "sample_officer",
  is_officer: 1,
  sem_hours: 24,
  total_hours: 30,
  status: "active",
  level: "gold",
  description: "The first dummy officer account",
  event_id: 1
}])

p "Created #{User.count} users"

Event.create!([{
  name: "dummyEvent0",
  date: DateTime.parse("09/01/2016 17:00"),
  location: "Soda Hall",
  description: "This is a fake event"
},
{
  name: "dummyEvent1",
  date: DateTime.parse("10/01/2016 17:00"),
  location: "Cory Hall",
  description: "This is another fake event"
},
{
  name: "dummyEvent3",
  date: DateTime.parse("02/11/2016 18:00"),
  location: "Dwinelle",
  description: "This is a fake today event"
}])

p "Created #{Event.count} events"