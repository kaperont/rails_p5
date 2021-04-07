# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Users
user1 = User.new
user1.login = "peront"
user1.email = "peront@nice.com"
user1.password = "password"
user1.password_confirmation = "password"
user1.admin = false
user1.save!


# Create Courses
Course.create(Course_ID: "BTGE-1720", Catalog_ID: 1, Description: "Introductory Bible Class", Name: "SPIFO", Credits: 3)
Course.create(Course_ID: "CS-1210", Catalog_ID: 1, Description: "Pointers and such", Name: "Intro to C++", Credits: 3)
Course.create(Course_ID: "CS-1220", Catalog_ID: 1, Description: "Further development of student problem solving and...", Name: "Obj-Orient Design/C++", Credits: 3)
Course.create(Course_ID: "CS-2210", Catalog_ID: 1, Description: "Introduction to the proper use of data structures...", Name: "Data Struct Using Java", Credits: 3)


# Create Plans
pplan1 = Plan.new
pplan1.Name = "awesome"
pplan1.user_id = user1.id
pplan1.Major_ID = 1
pplan1.Catalog_ID = 1
pplan1.Current_Year = 2021
pplan1.Current_Semester = "Spring"
pplan1.save!

pplan2 = Plan.new
pplan2.Name = "numTwo"
pplan2.user_id = user1.id
pplan2.Major_ID = 1
pplan2.Catalog_ID = 1
pplan2.Current_Year = 2021
pplan2.Current_Semester = "Spring"
pplan2.save!

pplan3 = Plan.new
pplan3.Name = "whodidwhat"
pplan3.user_id = user1.id
pplan3.Major_ID = 1
pplan3.Catalog_ID = 1
pplan3.Current_Year = 2021
pplan3.Current_Semester = "Spring"
pplan3.save!


# Create Plan_Courses
PlanCourse.create(Plan_ID: 1, Course_ID: "BTGE-1720", Year: 2016, Term: "Fall")
PlanCourse.create(Plan_ID: 1, Course_ID: "CS-1210", Year: 2016, Term: "Fall")
PlanCourse.create(Plan_ID: 1, Course_ID: "CS-1220", Year: 2016, Term: "Fall")
PlanCourse.create(Plan_ID: 1, Course_ID: "CS-2210", Year: 2016, Term: "Fall")