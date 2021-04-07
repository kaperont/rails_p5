//////////////////////////////////   CLASSES   //////////////////////////////////

class Course {

    constructor(designator, year, semester){
        this.designator = designator;
        this.year = year;
        this.semester = semester;
    }

    getDesignator() {
        return this.designator;
    }
    getYear() {
        return this.year;
    }
    getSem() {
        return this.semester;
    }

}

class Year {

    constructor(year, semesters) {
        this.year = year;
        this.semesters = semesters;
    }

    getYear(){
        return this.year;
    }
    getSemesters(){
        return this.semesters;
    }

}

class Semester {

    constructor(year, semester, courses){
        this.year = year;
        this.semester = semester;
        this.courses = courses;
    }

    getYear(){
        return this.year;
    }
    getSemester(){
        return this.semester;
    }
    getCourses() {
        return this.courses;
    }

}

class Plan {
    
    constructor(student, plan_name, major, cat_year, curr_year, curr_term, courses) {
        this.student = student;
        this.plan_name = plan_name;
        this.major = major;
        this.cat_year = cat_year;
        this.curr_year = curr_year;
        this.curr_term = curr_term;
        this.courses = courses;
    }
    getPlan(){
        return this.plan_name;
    }
    getStudent(){
        return this.student;
    }
    getName(){
        return this.plan_name;
    }
    getMajor(){
        return this.major;
    }
    getCatYear(){
        return this.cat_year;
    }
    getYear(){
        return this.curr_year;
    }
    getCurrSem(){
        return this.curr_term;
    }
    getCourses(){
        return this.courses;
    }

}

//////////////////////////////// GLOBAL CLASS CREDIT RELATION ///////////////////////////
let GLOBAL_COURSES = [];
let GLOBAL_CREDITS = [];

$.ajax({
    url: "/course/"+plan.id,
    dataType: "json",
    success: function(data){
        let classes = data.catalog.courses;

        for(i in classes){
            GLOBAL_CREDITS.push(parseInt(classes[i].credits));
            GLOBAL_COURSES.push(classes[i].id);
            }
        GLOBAL_COURSES.push("check");
    }
});

////////////////////////////// GLOBAL PLAN & GLOBAL_CATALOG //////////////////////////////
let GLOBAL_PLAN = new Plan();
let GLOBAL_CATALOG = new Object();





//////////////////////////////////   FUNCTIONS   ////////////////////////////////////////

function load() {
    generate_plan();
    addReqs();
}

function countCredits(arr){
    let count = 0;
    for(let i = 0; i < arr.length -1 ; i++){
        count += arr[i];
    }
    return count;
}
function ClassNameToCredits(name){
    for(let i = 0; i < GLOBAL_COURSES.length - 1; i++){
        if(name == GLOBAL_COURSES[i]){
            return(GLOBAL_CREDITS[i])
        }
    }
    //alert("Class not found");
    return 1;
}

function generate_plan(){

    $.getJSON('/~peront/CS3220/TermProject/php/getAll.php', function(data){

        let courses = [];

        let student = data.plan.student;
        let plan_name = data.plan.name;
        let major = data.plan.major;
        let cat_year = data.plan.catYear;
        let curr_year = data.plan.currYear;
        let curr_term = data.plan.currTerm;
        let classes = data.plan.courses;

        for(i in classes){
            courses.push(new Course(data.plan.courses[i].id, data.plan.courses[i].year, data.plan.courses[i].term));
        }

        // Initialize GLOBAL PLAN & GLOBAL_CATALOG
        GLOBAL_PLAN = new Plan(student, plan_name, major, cat_year, curr_year, curr_term, courses);
        GLOBAL_CATALOG = data.catalog;

        //Update Plan Dropdown  
        //implement_plan_dropdown(GLOBAL_PLAN.getPlan());  //Starting plan, use this if we add drop down to plan header

        // Update Plan Header
        implement_plan_header();

        // Update Semester Headers
        implement_plan_semester_headers(); 

        // Display Student's Planned Courses
        implement_plan();

        // Display GLOBAL GLOBAL_CATALOG
        implement_course_finder();

        let user_username = ("<b>Student:</b> " + student);
        $('#user-info-top').append("<p class='user-info-text' id=\"user-username\">" + user_username + "</p>");

        let user_major = ("<b>Major:</b> " + major);
        $('#user-info-top').append("<p class='user-info-text' id=\"user-major\">" + user_major + "</p>");

        let user_catalog = ("<b>Catalog:</b> " + cat_year);
        $('#user-info-bottom').append("<p class='user-info-text' id=\"user-catalog\">" + user_catalog + "</p>");

        let user_filler = ("<b>Plan Name:</b> " + plan_name);
        $('#user-info-bottom').append("<p class='user-info-text' id=\"user-filler\">" + user_filler + "</p>");

    });

}

/////////PLAN DROPDOWN////////////  //Logan Henig
/*function implement_plan_dropdown(){
    document.getElementById("drop-menu-1").insertAdjacentHTML("beforeend", "<option value=\"1\">--Select Year--</option>");


    //ONCE WE HAVE PLAN SET UP MODIFY TO ADD OTHER PLANS TO DROPDOWN
    for(i in data){
        let item = start.concat(data[i], close_parenth, data[i], end);
        document.getElementById("drop-menu-1").insertAdjacentHTML("beforeend", item);
    }
}*/
///////END PLAN DROPDOWN//////////

function implement_plan_header(){
    let sem_title_1 = "Academic Plan: ";
    let sem_title_2 = GLOBAL_PLAN.getName();
    let sem_title = sem_title_1.concat(sem_title_2);

    let sem_title_holder = document.createElement("div");
    sem_title_holder.setAttribute("class", "section-title");
    let semester_title = document.createTextNode(sem_title);
    sem_title_holder.appendChild(semester_title);
    var element = document.getElementById("sem-div");
    element.prepend(sem_title_holder);
}

function implement_plan_semester_headers(){

    let cat_year = GLOBAL_PLAN.cat_year;
    let term = ["Fall ", "Spring ", "Summer "];
    let year_html = [
        document.getElementById("first-year"),
        document.getElementById("second-year"),
        document.getElementById("third-year"),
        document.getElementById("fourth-year")
    ];

    // Print Semester Heading
    for(i = 1; i <= 4; i++){
        for(j = 1; j <= 3; j++){

            if(j == 2) {
                cat_year++;
            }
            
            let sem_year = cat_year;
            let sem = term[j-1].concat(sem_year.toString());

            ///// SEMESTER DIVS /////
            let sem_div = document.createElement("div");
            sem_div.setAttribute("class", "semester");
            sem_div.setAttribute("id", sem);
            year_html[i-1].appendChild(sem_div);
            ///// SEMESTER DIVS /////


            ///// SEMESTER TITLES /////
            let sem_holder = document.createElement("p");
            sem_holder.setAttribute("class", "semester-header");
            let sem_title = document.createTextNode(sem);
            sem_holder.appendChild(sem_title);

            let sem_element = document.getElementById(sem);
            sem_element.appendChild(sem_holder);
            ///// SEMESTER TITLES /////

        }
    }

}

function implement_plan(){

    let courses = GLOBAL_PLAN.getCourses();
    let semesterCredits = [];   // parallel arrays to keep track of the credits in each semester
    let tempSemester = [];      // this will hold the value of html ID
    for(i in courses){

        let space = " ";
        let designator = courses[i].designator;
        let year = courses[i].year;
        let semester = courses[i].semester;

        

        let course_string = designator;

        if(designator in GLOBAL_CATALOG.courses){
            course_string = course_string.concat(space, GLOBAL_CATALOG.courses[designator].name);
        }

        let html_id = semester.concat(space, year);

        let course_p = document.createElement("p");
        course_p.setAttribute("class", "semester-class");
        course_p.setAttribute("draggable", "true");
        let course_placeholder = document.createTextNode(course_string);
        course_p.appendChild(course_placeholder);

        let element = document.getElementById(html_id);
        element.appendChild(course_p);

        if(tempSemester.indexOf(html_id) != -1){
            semesterCredits[tempSemester.indexOf(html_id)] += ClassNameToCredits(designator);
        }
        else{
            tempSemester.push(html_id);
            semesterCredits.push(ClassNameToCredits(designator));
        }
    }
    for(let i = 0; i < tempSemester.length; i++){
        //var div = document.getElementById(tempSemester[i]);
        //div.innerHTML += "CREDITS: " + semesterCredits[i];

        let course_p = document.createElement("p");
        course_p.setAttribute("class", "semester-header");
        let course_placeholder = document.createTextNode("CREDITS: " + semesterCredits[i]);
        course_p.appendChild(course_placeholder);
        let element = document.getElementById(tempSemester[i]);
        element.appendChild(course_p);

    }
    

}

function implement_course_finder(){

    let cat = GLOBAL_CATALOG.courses;
    let table = $('#dataTable').DataTable();

    for(let i in cat){
        let classData = '';

        table.row.add( [
            cat[i].id,
            cat[i].name,
            cat[i].description,
            cat[i].credits
        ]).draw(false);
        
    }

}

function addReqs() {

    let core_courses = [];
    let electives = [];
    let cognates = [];

    
    $.getJSON('/~peront/CS3220/TermProject/php/getAll.php', function(data){

        core_courses = data.categories.Core.courses;
        electives = data.categories.Electives.courses;
        cognates = data.categories.Cognates.courses;

        $.getJSON('/~peront/CS3220/TermProject/php/getAll.php', function(data){

            let space = " ";
            let catalog = data.catalog;

            for(i in core_courses){
                let text = core_courses[i];
                if(core_courses[i] in catalog.courses){
                    text = text.concat(space, catalog.courses[core_courses[i]].name)
                }

                let holder = document.createElement("p");
                holder.setAttribute("class", "req-class-placeholder");
                holder.setAttribute("draggable", "true");
                let class_placeholder = document.createTextNode(text);
                holder.appendChild(class_placeholder);
                var element = document.getElementById("accord-div-1");
                element.appendChild(holder);
            }

            for(i in electives){
                let text = electives[i];
                if(electives[i] in catalog.courses){
                    text = text.concat(space, catalog.courses[electives[i]].name)
                }

                let holder = document.createElement("p");
                holder.setAttribute("class", "req-class-placeholder");
                holder.setAttribute("draggable", "true");
                let class_placeholder = document.createTextNode(text);
                holder.appendChild(class_placeholder);
                var element = document.getElementById("accord-div-2");
                element.appendChild(holder);
            }

            for(i in cognates){
                let text = cognates[i];
                if(cognates[i] in catalog.courses){
                    text = text.concat(space, catalog.courses[cognates[i]].name)
                }

                let holder = document.createElement("p");
                holder.setAttribute("class", "req-class-placeholder");
                holder.setAttribute("draggable", "true");
                let class_placeholder = document.createTextNode(text);
                holder.appendChild(class_placeholder);
                var element = document.getElementById("accord-div-3");
                element.appendChild(holder);
            }

        });

    });

}