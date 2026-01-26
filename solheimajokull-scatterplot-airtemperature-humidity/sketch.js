// Scatter plot featuring humidity and air temperatue data plotted against x and y (horizontal and vertical) coordinates

// declaring table
let table;
// initialising values for air temperature and humidity, and declaring ranges for both
var maxTemp = 14;
var minTemp = 0;
var tempRange;
var maxHum = 100;
var minHum = 0;
var humRange;
// initiliasing margins
var marginX = 40;
var marginY = 40;

function preload(){
  table = loadTable('weather.csv', 'csv', 'header');
}

function setup(){
  createCanvas(windowWidth, 400);
  //calculate ranges
  tempRange = maxTemp - minTemp;
  humRange = maxHum - minHum;
  
  noLoop();
}

function draw(){
  background(255);
  
  textStyle(BOLD);
  textAlign(CENTER);
  text('Solheimajokull Scatter Plot', windowWidth/2, (height - height) + 20);  
  
  textStyle(NORMAL);  
  textAlign(CENTER);
  text('Air Temperature', windowWidth/2, (height - 8));   
  
  push();
  let angle = radians(270);
  translate((windowWidth - windowWidth) + 12, height/2);
  rotate(angle);
  text('Humidity', 0, 0);
  pop();  
  
  var plotHeight = height - marginY * 2;
  var plotWidth = width - marginX * 2;
  // drawing major gridlines (x)
  stroke(230);
  for (i = 0; i < 10; i++) {
    line(marginX, marginY + i * (plotHeight / 10), marginX + plotWidth, marginY + i * (plotHeight / 10));
  }
  // drawing major gridlines (y)  
  for (i = 0; i < 7; i++) {
    line(marginX + (i + 1) * (plotWidth / 7), marginY, marginX + (i + 1) * (plotWidth / 7), marginY + plotHeight);
  }
  
  // drawing x and y axes
  stroke(0);
  // drawing x axis
  line(marginX, height - marginY, width - marginX, height - marginY);
  // drawing y axis
  line(marginX, marginY, marginX, height - marginY);
  
  // drawing data labels
  noStroke();
  // drawing x axis labels
  for (i = 0; i < 8; i++) {
    textAlign(CENTER, TOP);
    text(round(minTemp + i * (tempRange / 7)), marginX + (plotWidth / 7) * i, marginY + plotHeight + 5);
  }
  // drawing y axis labels
  for (var i = 0; i < 10; i++) {
    textAlign(RIGHT, CENTER);
    text(round(maxHum - i * (humRange / 10)), marginX - 5, marginY + (plotHeight / 10) * i);
  }
  
  // drawing data dots
  fill(0);
  for (i = 0; i < table.getRowCount(); i++) {
    // storing dot data (weather)
    var thisTemp = float(table.getString(i, 'AirTemp'));
    var thisHum = float(table.getString(i, 'Humidity'));
    if ((thisTemp > maxTemp) || (thisTemp < minTemp) || (thisHum > maxHum) || (thisHum < minHum)){
      continue;
    }
    // converting dot data (weather) to dot coordinates
    var thisX = map(thisTemp, minTemp, maxTemp, marginX, marginX + plotWidth);
    var thisY = map(thisHum, minHum, maxHum, marginY + plotHeight, marginY);
    ellipse(thisX, thisY, 3, 3);
  }
}