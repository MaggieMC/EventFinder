$(document).ready(function(){
  //Updates x dropdown menu
  $("#xlist li a").click(function(){
  $("#x:first-child").text($(this).text());
});
  //Updates y dropdown menu
  $("#ylist li a").click(function(){
  $("#y:first-child").text($(this).text());
});
  //Requests logic from server when button is clicked and displays events
  $('#find').click(function(){
    $('#result').empty();
    var locationx = $("#x:first-child").text();
    var locationy = $("#y:first-child").text();
    var parameters =  { x: locationx, y: locationy};
      $.get('/getEvents', parameters, function(data){
        for(i=0; i<data.length; i++){
          $('#result').append("<li>" + data[i] + "</li>");
        }

      })
  });
});
