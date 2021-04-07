let dragged;

document.addEventListener("dragstart", function(event){
    dragged = event.target;
    $(".semester-class").not(dragged).css("pointer-events", "none");
    $(".req-class-placeholder").not(dragged).css("pointer-events", "none");
    $(".database-text-1").not(dragged).css("pointer-events", "none");
    $(".database-text-2").not(dragged).css("pointer-events", "none");

}, false);

document.addEventListener("dragover", function(event){
    event.preventDefault();
}, false);

document.addEventListener("drop", function(event){
    let test = $(".accord-content");
    let req_table = document.getElementById("accord-div-1");
    let parent = dragged.parentNode;

    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);

    $(".semester-class").css("pointer-events", "auto");
    $(".req-class-placeholder").not(dragged).css("pointer-events", "auto");
    $(".database-text-1").not(dragged).css("pointer-events", "auto");
    $(".database-text-2").not(dragged).css("pointer-events", "auto");
}, false);