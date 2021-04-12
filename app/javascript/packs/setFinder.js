function implement_course_finder(){

    $.ajax({
        dataType: "json",
        url: "/plans/1",
        type: "get",
        success: function(data){

            let cat = data.catalog.courses;

            let table = $('#dataTable').DataTable({
                "scrollY": "200px",
                "scrollCollapse": true,
                "paging": false
            });

            for(let i in cat){

                table.row.add( [
                    cat[i].id,
                    cat[i].name,
                    cat[i].description,
                    cat[i].credits
                ]).draw(false);
        
            }

        }
    });

}

implement_course_finder();