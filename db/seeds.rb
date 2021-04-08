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
user1.email = "kaper@nice.com"
user1.password = "password"
user1.password_confirmation = "password"
user1.save!



# Create Catalogs
cat1 = Catalog.new
cat1.year = 2016
cat1.save!



# Create Majors
maj1 = Major.new
maj1.name = "Computer Science"
maj1.save!

maj2 = Major.new
maj2.name = "Biology"
maj2.save!

maj3 = Major.new
maj3.name = "Computer Engineering"
maj3.save!



# Create Plans
p1 = Plan.new
p1.user_id = user1.id
p1.catalog_id = cat1.id
p1.major_id = maj1.id
p1.name = "awesome"
p1.current_year = 2018
p1.current_semester = "Spring"
p1.save!

Plan.create(user_id: user1.id, catalog_id: cat1.id, major_id: maj1.id, name: "toolate", current_year: 2021, current_semester: "Spring")
Plan.create(user_id: user1.id, catalog_id: cat1.id, major_id: maj1.id, name: "asdf;lkjae", current_year: 2022, current_semester: "Fall")



# Create Categories
category1 = Category.new
category1.name = "CS_Core"
category1.save!
category2 = Category.new
category2.name = "CS_Electives"
category2.save!
category3 = Category.new
category3.name = "CS_Cognates"
category3.save!

category4 = Category.new
category4.name = "Bio_Core"
category4.save!
category5 = Category.new
category5.name = "Bio_Electives"
category5.save!
category6 = Category.new
category6.name = "Bio_Cognates"
category6.save!

category7 = Category.new
category7.name = "CpE_Core"
category7.save!
category8 = Category.new
category8.name = "CpE_Electives"
category8.save!
category9 = Category.new
category9.name = "CpE_Cognates"
category9.save!



# Create Requirements
Requirement.create(catalog_id: cat1.id, major_id: maj1.id, category_id: category1.id)
Requirement.create(catalog_id: cat1.id, major_id: maj1.id, category_id: category2.id)
Requirement.create(catalog_id: cat1.id, major_id: maj1.id, category_id: category3.id)

Requirement.create(catalog_id: cat1.id, major_id: maj2.id, category_id: category4.id)
Requirement.create(catalog_id: cat1.id, major_id: maj2.id, category_id: category5.id)
Requirement.create(catalog_id: cat1.id, major_id: maj2.id, category_id: category6.id)

Requirement.create(catalog_id: cat1.id, major_id: maj3.id, category_id: category7.id)
Requirement.create(catalog_id: cat1.id, major_id: maj3.id, category_id: category8.id)
Requirement.create(catalog_id: cat1.id, major_id: maj3.id, category_id: category9.id)



# Create Courses
c1 = Course.new
c1.catalog_id = cat1.id
c1.name = "Chem for Engineers"
c1.description = "Fundamental concepts of chemistry are developed with applications of chemistry to engineering disciplines. Students are introduced to measurement, number handling, the Periodic Table, decriptive properties of atoms, elements, molecules and ions, chemical reactions, stoichiometry, chemical bonding, equilibrium, thermodynamics, gas laws, and the nature of solids and liquids. Laboratory emphasizes quantitative skills."
c1.credits = 3
c1.designator = "CHEM-1050"
c1.save!

c2 = Course.new
c2.catalog_id = cat1.id
c2.name = "Intro to C++"
c2.description = "Introduction to C++."
c2.credits = 3
c2.designator = "CS-1210"
c2.save!

c3 = Course.new
c3.catalog_id = cat1.id
c3.name = "Obj-Orient Design/C++"
c3.description = "Further development of student problem solving and programming skills beyond CS-1210 by increased exposure to C++ language features including pointers, object-oriented language constructs and design principles, memory management mechanisms, exception handling, event-driven programming, and graphical user interfaces (GUI)."
c3.credits = 3
c3.designator = "CS-1220"
c3.save!

c4 = Course.new
c4.catalog_id = cat1.id
c4.name = "Data Struct Using Java"
c4.description = "Indroduction to the proper use of data structures for developing efficient software; data structures include stacks, queues, priority queues, hash tables, trees, and graphs."
c4.credits = 3
c4.designator = "CS-2210"
c4.save!

c5 = Course.new
c5.catalog_id = cat1.id
c5.name = "Cyber Operations"
c5.description = "This course covers cyber operations and the best practices of securing a technology infrastructure. Topics covered include offensive cyber operations, cyber-related legal precedents and regulations, wired and wireless network security, intrusion detection and prevention systems, system hardening, and defense in depth. This is a hands-on course with a heavy emphasis on virtual machine-based lab exercises."
c5.credits = 3
c5.designator = "CS-4310"
c5.save!

c6 = Course.new
c6.catalog_id = cat1.id
c6.name = "Software Security"
c6.description = "A detailed look at issues involved in providing secure software systems. Students will study principles and practices of software development that result in software that is robust and secure from attack. Students will learn techniques for analyzing software to determine whether it contains weaknesses that are vulnerable to exploitation. Students will also explore reverse engineering of software to understand the design of an existing software component to determine its security and whether it could contain malware."
c6.credits = 3
c6.designator = "CS-4330"
c6.save!

c7 = Course.new
c7.catalog_id = cat1.id
c7.name = "Calculus I"
c7.description = "First course of a two-course sequence covering basic concepts of analytic geometry and single variable calculus. Includes limits and derivatives of algebraic and transcendental functions, applications of the derivative, single variable integration including the Fundamental Theorem of Calculus and integration by substitution, and applications of integration including solving differential equations and finding volumes of revolution."
c7.credits = 5
c7.designator = "MATH-1710"
c7.save!



# Create PlanCourses
PlanCourse.create(plan_id: p1.id, course_id: c1.id, term: "Fall", year: 2016)
PlanCourse.create(plan_id: p1.id, course_id: c2.id, term: "Fall", year: 2016)
PlanCourse.create(plan_id: p1.id, course_id: c3.id, term: "Fall", year: 2016)
PlanCourse.create(plan_id: p1.id, course_id: c4.id, term: "Fall", year: 2016)
PlanCourse.create(plan_id: p1.id, course_id: c5.id, term: "Fall", year: 2016)
PlanCourse.create(plan_id: p1.id, course_id: c6.id, term: "Fall", year: 2016)
PlanCourse.create(plan_id: p1.id, course_id: c7.id, term: "Fall", year: 2016)



# Create CatalogCourses
CatalogCourse.create(catalog_id: cat1.id, course_id: c1.id)
CatalogCourse.create(catalog_id: cat1.id, course_id: c2.id)
CatalogCourse.create(catalog_id: cat1.id, course_id: c3.id)
CatalogCourse.create(catalog_id: cat1.id, course_id: c4.id)
CatalogCourse.create(catalog_id: cat1.id, course_id: c5.id)
CatalogCourse.create(catalog_id: cat1.id, course_id: c6.id)
CatalogCourse.create(catalog_id: cat1.id, course_id: c7.id)



# Create CategoryCourses
CategoryCourse.create(category_id: category1.id, course_id: c2.id)
CategoryCourse.create(category_id: category1.id, course_id: c3.id)
CategoryCourse.create(category_id: category1.id, course_id: c4.id)

CategoryCourse.create(category_id: category2.id, course_id: c5.id)
CategoryCourse.create(category_id: category2.id, course_id: c6.id)

CategoryCourse.create(category_id: category3.id, course_id: c7.id)
CategoryCourse.create(category_id: category3.id, course_id: c1.id)
