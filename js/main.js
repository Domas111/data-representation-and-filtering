$(document).ready(function(){
  $(".dropdown-toggle").dropdown();
});
$.ajax({
  url: 'contacts.json',
  success: function(data){
    var cities = [];

    $.each(data, function(idx, obj) {
      cities[idx-1] = obj.city;
    });
    var uniqueCities = [];
    $.each(cities, function(i, el){
    if($.inArray(el, uniqueCities) === -1) uniqueCities.push(el);

});

$.each(uniqueCities, function(i, p) {
    $('#citydropdown').append($('<option></option>').val(p).html(p));
});

    var tabledata =data;
    console.log(tabledata);
    function updateFilter(){

}
var deleteIcon = function(cell, formatterParams, onRendered){ //plain text value
   return "<i class=\"fas fa-trash-alt deleteIcon\"></i>";
};
var editIcon = function(cell, formatterParams, onRendered){ //plain text value
   return "<i class=\"fas fa-pen-square editIcon\"></i>";
};
    var table = new Tabulator("#cardtable", {
 	height:"100%", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
 	data:tabledata, //assign data to table
 	layout:"fitColumns",
  autoResize:true, //fit columns to width of table (optional)
 	columns:[ //Define Table Columns
    {title:"", field:"active",width:"4.5%", formatter:function(cell, formatterParams, onRendered){
      if(cell.getValue() == true){
        return "<center><i class=\"far fa-eye\"></i></center>";
      }else{
        return "<center><i class=\"far fa-eye-slash\"></i></center>";
      }

},
},
    {title:"Name", field:"name", width:"15%"},
    {title:"Surname", field:"surname", width:"15%"},
    {title:"City", field:"city", width:"15%"},
    {title:"Email", field:"email", width:"25%"},
    {title:"Phone", field:"phone", width:"20%"},
    {formatter:editIcon,visible:true, width:"2.5%", align:"center"},
    {formatter:deleteIcon,visible:true, width:"2.5%", align:"center"},
 	],
 	rowClick:function(e, row){ //trigger an alert message when the row is clicked
        $("#nameb").html(row.getData().name);
        $("#surnameb").html(row.getData().surname);
        $("#cityb").html(row.getData().city);
        $("#emailb").html(row.getData().email);
        $("#phoneb").html(row.getData().phone);


 	},
});

window.addEventListener('resize', function(){
    table.redraw(true);
});
$("#searchName").bind("change paste keyup", function() {
   var searchFilter = $(this).val();
    table.setFilter("name","like",searchFilter);
});
$( "#filterbutton" ).click(function() {

  var cityFilter = $('#citydropdown').val();
  table.setFilter("city","like",cityFilter);
  if($("#checkbox").prop("checked") == true){
      table.setFilter("active","=",true);
  }else if($("#checkbox").prop("checked") == false){
  table.removeFilter("active","=",true);

  }

});



  }





});
