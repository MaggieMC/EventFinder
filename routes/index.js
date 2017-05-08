var express = require('express');
var router = express.Router();
var math = require('mathjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getEvents', function(req,res){
  var locationx = parseInt(req.query.x);
  var locationy = parseInt(req.query.y);
  var grid = math.zeros(11,11);
  var perimeter = 5;
  var size = 11;
  grid = generateGrid(grid, size);
  var x = calculatePerimeter(locationx, perimeter);
  var y = calculatePerimeter(locationy, perimeter);
  var events = findEvents(grid, x[0], x[1], y[0], y[1], locationx, locationy);
  res.send(events);
})


  /*Returns a random integer between min and max specified*/
  function randomInt(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  /*Returns false if the specified coordinate in the grid is empty (breaking the while loop) and true if it isn't*/
  function isEmpty(x,y, grid)
  {
    if(math.subset(grid, math.index(x,y)) == 0) {
      return false;
    }
    else{
      return true;
    }
  }

  /*Randomly generates an array of between 0 and 10 tickets with a price of a randomly generated number between 1 and 500 dollars*/
  function generateTickets(){
    tickets = []
    numberTickets = randomInt(0,10);
    for(t=0; t<numberTickets; t++){
      tickets.push(randomInt(1,500));
    }
    return tickets;
  }

  /*Returns the cheapest ticket in the array*/
  function returnCheapestTicket(tickets){
    if (tickets.length == 0 ){
      return 0;
    }
    else{
      var lowest = tickets[0];
      for( i=0; i<tickets.length; i++){
        if (tickets[i]<lowest){
          lowest = tickets[i];
        }
      }
      return lowest;
    }

  }

  /*Randomly generates events to fill a grid of coordinates 0 to 10*/
  function generateGrid(grid, size){
    numberEvents = randomInt(2,size);
    for (i=0; i<numberEvents; i++){
      var x = randomInt(0,10);
      var y = randomInt(0,10);
      //Checks if randomly generated coordinate is empty or not
      while(isEmpty(x,y, grid)){

        x = randomInt(0,10);
      }
      //Creates new random event object
      var random = {
        id: i,
        ticket: generateTickets(),
        coordinatex: x,
        coordinatey: y,
        distance: 0
      }
      //Assigns randomly generated event to empty coodinates
      grid.subset(math.index(x,y), random);
    }
    return grid;
  }

  /*Loops through the grid's specified perimeter coordinates to find all events in the perimeter of the specified
  coordinates*/
  function findEvents(grid, minx, maxx, miny, maxy, locationx, locationy){
    events = [];
    for (x=minx; x<=maxx; x++){
      for (y=miny; y<=maxy; y++){
        if(math.subset(grid, math.index(x,y)) != 0){
          var currentEvent = math.subset(grid, math.index(x,y));
          distance = calculateDistance(locationx, locationy, currentEvent);
          currentEvent["distance"] = distance;
          events.push(currentEvent);
        }
      }
    }
    events = sortByKey(events, "distance");
    for (e=0; e<events.length; e++){
      var current = events[e];
      events[e] = concatenateEvents(current, locationx, locationy)
    }
    return events;
  }
  /*Sorts the array of events by distance to give the shortest distance first*/
  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
  /*Calculates the perimeter around the specified coordinates to be searched*/
  function calculatePerimeter(x, perimeter){
    var min = x - perimeter;
    var max = x + perimeter;
    if (min < 0){
      min = 0;
    }
    if(max > 10){
      max = 10;
    }
    return [min, max];
  }

  /*Calculates the Manhatten Distance between specified coordinates and found events*/
  function calculateDistance(x, y, currentEvent){
    var ex = currentEvent.coordinatex;
    var ey = currentEvent.coordinatey;
    var distance = Math.abs((x-ex))+Math.abs((y-ey));
    return distance;
  }

  /*Prints the found events*/
  function concatenateEvents(object, locationx, locationy){
    var id = String(object.id);
    var cheapestprice = String(returnCheapestTicket(object.ticket));
    var cx = object.coordinatex;
    var cy = object.coordinatey;
    distance = object.distance;
    return("Event " + id +  " - Cheapest price: $" + cheapestprice + " Distance: " + distance);
  }

module.exports = router;
