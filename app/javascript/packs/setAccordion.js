$( function() {
    $( "#accordion" ).accordion({
        collapsible: true,
        heightStyle: "content",
        animate: 200
    });

    $( "#req-table" ).resizable({
        minHeight: 140,
        minWidth: 200,
        resize: function() {
            $( "#accordion" ).accordion( "refresh" );
        }
    });
});