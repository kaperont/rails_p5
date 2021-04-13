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
    dataType: "json",
    url: '/plans/1',
    type: "get",
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
        if(name.includes(GLOBAL_COURSES[i])){
            return(GLOBAL_CREDITS[i])
        }
    }
    return 1;
}

function generate_plan(){

    $.ajax({
        dataType: "json",
        url: "/plans/1",
        type: "get",
        success: function(data){

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

            // Update Plan Header
            implement_plan_header();

            // Update Semester Headers
            implement_plan_semester_headers();
            
            // Display Student's Planned Courses
            implement_plan();

            let user_username = ("<b>Student:</b> " + student);
            $('#user-info-top').append("<p class='user-info-text' id=\"user-username\">" + user_username + "</p>");
    
            let user_major = ("<b>Major:</b> " + major);
            $('#user-info-top').append("<p class='user-info-text' id=\"user-major\">" + user_major + "</p>");
    
            let user_catalog = ("<b>Catalog:</b> " + cat_year);
            $('#user-info-bottom').append("<p class='user-info-text' id=\"user-catalog\">" + user_catalog + "</p>");
    
            let user_filler = ("<b>Plan Name:</b> " + plan_name);
            $('#user-info-bottom').append("<p class='user-info-text' id=\"user-filler\">" + user_filler + "</p>");

        }

    });

}

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

// tracks the classes scedualled in the UR planner

function addReqs() {

    let core_courses = [];
    let electives = [];
    let cognates = [];

    
    $.ajax({
        dataType: "json",
        url: "/plans/1",
        type: "get",
        success: function(data){

        core_courses = data.categories.requirements[0].courses;
        electives = data.categories.requirements[1].courses;
        cognates = data.categories.requirements[2].courses;

            $.ajax({
                dataType: "json",
                url: "/plans/1",
                type: "get",
                success: function(data){

                    let space = " ";
                    let catalog = data.catalog;

                    for(i in core_courses){
                        let text = core_courses[i];

                        for(let j = 0; j < catalog.courses.length; j++){
                            if (core_courses[i].id == catalog.courses[j].id){
                                text = text.id + space + catalog.courses[j].name;
                                break;
                            }
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
                        for(let j = 0; j < catalog.courses.length; j++){
                            if (electives[i].id == catalog.courses[j].id){
                                text = text.id + space + catalog.courses[j].name;
                                break;
                            }
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
                        for(let j = 0; j < catalog.courses.length; j++){
                            if (cognates[i].id == catalog.courses[j].id){
                                text = text.id + space + catalog.courses[j].name;
                                break;
                            }
                        }

                        let holder = document.createElement("p");
                        holder.setAttribute("class", "req-class-placeholder");
                        holder.setAttribute("draggable", "true");
                        let class_placeholder = document.createTextNode(text);
                        holder.appendChild(class_placeholder);
                        var element = document.getElementById("accord-div-3");
                        element.appendChild(holder);
                    }
                    generate_plan();
                }

            });
        }
    });


}

let GLOBAL_COURSES_PLANNED = [];

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

        for(let i = 0; i < GLOBAL_CATALOG.courses.length; i++){
            if (designator == GLOBAL_CATALOG.courses[i].id){
                course_string = course_string.concat(space, GLOBAL_CATALOG.courses[i].name);
                break;
            }
        }

        let html_id = semester.concat(space, year);

        let course_p = document.createElement("p");
        course_p.setAttribute("class", "semester-class");
        course_p.setAttribute("draggable", "true");
        let course_placeholder = document.createTextNode(course_string);

        GLOBAL_COURSES_PLANNED.push(course_string);

        let removeCourse = document.createElement("button");
        removeCourse.setAttribute("class", "deleteMe");
        let buttonText = document.createTextNode("X");
        removeCourse.appendChild(buttonText);

        course_p.appendChild(course_placeholder);
        course_p.appendChild(removeCourse);
        let element = document.getElementById(html_id);
        element.appendChild(course_p);// + removeCourse);
        //element.appendChild(removeCourse);

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
    

        //////End Monitor Class changes//////
    for(let i = 0; i < GLOBAL_COURSES_PLANNED.length; i++){
        changeCourseColor(GLOBAL_COURSES_PLANNED[i], 'green');
    }

    ///// calls drag and drop script once everything is created/////
    dragAndDrop();

}

function dragAndDrop(){

    $( ".semester-class" ).draggable({helper: 'clone'});
    $(".req-class-placeholder").draggable({helper: 'clone'});

    $( ".semester").droppable(
    {
        

        accept: ".req-class-placeholder, .semester-class",

        drop : function(ev,ui){
            
            let credit_text;
            var droppableItem = $(ui.draggable).clone();
            //alert(ui.draggable.attr('class') + ' was dropped from ' + ui.draggable.parent().attr('class'))
            let course_p = document.createElement("p");
            course_p.setAttribute("class", "semester-class");
            course_p.setAttribute("draggable", "true");
        
            let tempText = droppableItem.text();
            if(tempText.charAt(tempText.length - 1) == 'X'){
                tempText = tempText.slice(0, -1);
                $(ui.draggable).remove(); //this means that it was in plan if it has an X

            }
            else{
                GLOBAL_COURSES_PLANNED.push(tempText);
            }
            let course_placeholder = document.createTextNode(tempText);
            let removeCourse = document.createElement("button");
            removeCourse.setAttribute("class", "deleteMe");
            let buttonText = document.createTextNode("X");
            removeCourse.appendChild(buttonText);

            course_p.appendChild(course_placeholder);
            course_p.appendChild(removeCourse);
        
            ////////// Change Credits ////////////
            var creditsString = $(this).children().last().text();
            if(!creditsString.includes("CREDITS: ")){
                creditCount = 0;
            }
            else{
                creditsString = creditsString.split(" ");
                var creditCount = parseInt(creditsString[1]);
                //check the value of the class added//
        
                $(this).children().last().remove()
            }
            creditCount += ClassNameToCredits(tempText);
            /////////Change Credits End ///////////

            $(this).append(course_p);
            $(course_p).appendTo(this).draggable();
            changeCourseColor(tempText, 'green');

            let credit_p = document.createElement("p");
            credit_p.setAttribute("class", "semester-header");
            credit_text = document.createTextNode("CREDITS: " + creditCount);
            credit_p.appendChild(credit_text);
            $(this).append(credit_p);
    
        }

    });
}

$(document).ready(function(){
    $(document).on('click','.deleteMe',function(e){
        let tempText = $(this).closest("p").text();
        if(tempText.charAt(tempText.length - 1) == 'X'){
            tempText = tempText.slice(0, -1);
        }
        let index = GLOBAL_COURSES_PLANNED.indexOf(tempText);
        GLOBAL_COURSES_PLANNED.splice(index, 1);
        
        if(GLOBAL_COURSES_PLANNED.indexOf(tempText) == -1){
            changeCourseColor(tempText, "red");
        }
        var parentDiv = $(this).closest("p").parent();
        $(this).closest("p").remove(); 
        
        var creditsString = $(parentDiv).children().last().text();
        
        creditsString = creditsString.split(" ");
        var creditCount = parseInt(creditsString[1]);
        //check the value of the class added//
        creditCount -= ClassNameToCredits(tempText);

        $(parentDiv).children().last().remove();
        if(creditCount == 0 ){return;}

        let credit_p = document.createElement("p");
        credit_p.setAttribute("class", "semester-header");
        let credit_text = document.createTextNode("CREDITS: " + creditCount);
        credit_p.appendChild(credit_text);
        //let element = document.getElementById(tempSemester[i]);
        $(parentDiv).append(credit_p);
    });
   
 });

 function changeCourseColor(text, color){
    var className = document.getElementsByClassName('req-class-placeholder');
   for(var index=0;index < className.length;index++){
      console.log(className[index].innerText);
      if(text.charAt(text.length - 1) == 'X'){
          text = text.slice(0, -1);
      }
      if(text == className[index].innerText){
          className[index].style.color = color;
      }
   }
}

load();