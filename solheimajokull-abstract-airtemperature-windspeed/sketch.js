//Abstract visualisation displaying weather spheres with colour values mapped to air temperature and movement rate mapped to wind speed

// array of individual spheres
var wSpheres = [];
// declaring data array
var data;
// relevant data
var tempValues = [];
var windValues = [];
// store average
let average;
//
var x = 0; var y = 7;
//
var week1TempAverage, week1WindAverage;
var week2TempAverage, week2WindAverage;
var week3TempAverage, week3WindAverage;
var week4TempAverage, week4WindAverage;
var week5TempAverage, week5WindAverage;
//
var weekTemps = [];
var weekWinds = [];
var labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
var tags = ['1', '2', '3', '4', '5'];
var yPos = 75;
var count = 0;

// loading data before setup and draw
function preload(){
  data = loadJSON('data/weather.json');
}

function setup() {
  createCanvas(526, 430);
  noStroke();
  
  populate();  
  print(weekTemps);
  print(weekWinds);
  
  for (i = 0; i < labels.length; i++) {
    count = count + 1    
    if((count != 1) && (count <= 5)){
      yPos = yPos + 75;
    }
    wSpheres.push(new drawSphere());
  }  
}

function draw() {
  background(220);
  textStyle(BOLD)
  textAlign(CENTER);
  text('Solheimajokull Warmth and Wind Speed', 263, 20);

  fill(0, 102, 153);

  for (i = 0; i < labels.length; i++) {
    //move spheres
    wSpheres[i].move(weekWinds[i])//((weekWinds[i])/0.1);
    //display spheres
    wSpheres[i].display(weekTemps[i], labels[i]);
  }
  
}

function avg(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  arr.average = sum / arr.length; 
}

// pupulate and parse weekly data groups
function populate(){
  var dataset = Object.values(data);  
  let week1DataSet = dataset.slice(x, y);
  for (i = 0; i < week1DataSet.length; i++){    
    tempValues[i] = week1DataSet[i].AirTemp;
    avg(tempValues);
    week1TempAverage = tempValues.average;
    
    windValues[i] = week1DataSet[i].WindSpd;
    avg(windValues);
    week1WindAverage = windValues.average;       
  }
  
  weekTemps.push(week1TempAverage);
  weekWinds.push(week1WindAverage);    
  x = x + 7; y = y + 7
  
  let week2DataSet = dataset.slice(x, y);
  for (i = 0; i < week2DataSet.length; i++){    
    tempValues[i] = week2DataSet[i].AirTemp;
    avg(tempValues);
    week2TempAverage = tempValues.average;
    
    windValues[i] = week2DataSet[i].WindSpd;
    avg(windValues);
    week2WindAverage = windValues.average;          
  }

  weekTemps.push(week2TempAverage);
  weekWinds.push(week2WindAverage);   
  x = x + 7; y = y + 7  
  
  let week3DataSet = dataset.slice(x, y);
  for (i = 0; i < week3DataSet.length; i++){    
    tempValues[i] = week3DataSet[i].AirTemp;
    avg(tempValues);
    week3TempAverage = tempValues.average;
    
    windValues[i] = week3DataSet[i].WindSpd;
    avg(windValues);
    week3WindAverage = windValues.average;          
  }
  
  weekTemps.push(week3TempAverage);
  weekWinds.push(week3WindAverage);  
  x = x + 7; y = y + 7  
  
  let week4DataSet = dataset.slice(x, y);
  for (i = 0; i < week4DataSet.length; i++){    
    tempValues[i] = week4DataSet[i].AirTemp;
    avg(tempValues);
    week4TempAverage = tempValues.average;
    
    windValues[i] = week4DataSet[i].WindSpd;
    avg(windValues);
    week4WindAverage = windValues.average;        
  } 
  
  weekTemps.push(week4TempAverage);
  weekWinds.push(week4WindAverage); 
  x = x + 7; y = y + 7  
  
  let week5DataSet = dataset.slice(x, y);
  for (i = 0; i < week5DataSet.length; i++){    
    tempValues[i] = week5DataSet[i].AirTemp;
    avg(tempValues);
    week5TempAverage = tempValues.average;
    
    windValues[i] = week5DataSet[i].WindSpd;
    avg(windValues);
    week5WindAverage = windValues.average;       
  }  
  
  weekTemps.push(week5TempAverage);
  weekWinds.push(week5WindAverage);
}

function drawSphere() {
  this.direction = 1;
  this.x = 0;
  this.move = function(speedVar) {
    //maps speed range to paris temperature range
    this.speed = (speedVar*this.direction);
    this.x += this.speed
    //allows balls to bounce off canvas boundaries
		if(this.x < 0 || this.x > width)
			this.direction = -this.direction;
  };
  
  this.y = yPos;

  //map sphere colour to air temperature
  this.display = function(colorVar, label) {
    this.temp = map(colorVar, min(weekTemps), max(weekTemps), 10, 100);
    
    var colorVal = map(colorVar, min(weekTemps), max(weekTemps), 10, 255);
    tempColor = color(colorVal, 100, 255-colorVal);
   	fill(tempColor);
 
    // text placement
    textStyle(NORMAL);    
    textAlign(LEFT);      
    text(label, 30 + this.x, this.y);
    // sphere size
    ellipse(this.x, this.y, 50, 50);
  };
}

//Visualisation suggests: wind speed on the glacier increased over the weeks and was highest on week 5 (partial); week 4 was the coolest week and week 1 the warmest, air temperature fell leading up to week 4 then began rising again; no noticeable correlation between air temperature and wind speed within this dataset