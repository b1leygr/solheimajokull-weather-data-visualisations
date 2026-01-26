//Interactive bar graph featuring humidity and wind speed data, with a dropdown box to switch between 7-day periods

class Dataset {
  constructor(value1, value2, label) {
    this.value1 = value1;
    this.value2 = value2;
    this.label = label;
  }
}  

// declaring data array and table
let data = [];
let table;
// declaring iterators for grouping into weeks
let x = 0;
let y = 7;
let n = 7;
// declaring value sets for humidity, windspeed, and date
var humValues, windValues, dateValues;
// declaring selected dropdown value
var selectValue;

// declaring switch and dropdown
let weeks = ['1', '2', '3', '4', '5'];
let select;

// loading table before setup and draw
function preload() {
  table = loadTable('weather.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, 400);
  // creating dropdown
  select = createSelect();
  // setting default option
  select.option('Choose a week');
  select.disable('Choose a week');
  select.selected('Choose a week');
  // setting week options
  select.option(weeks[0]);
  select.option(weeks[1]);
  select.option(weeks[2]);
  select.option(weeks[3]);
  select.option(weeks[4]);
  // calling custom refresh function upon dropdown change
  select.changed(refresh);
  
  // initiliasing value sets for humidity, windspeed, and date
  humValues = table.getColumn(2);
  windValues = table.getColumn(3);
  dateValues = table.getColumn(0);

  noStroke();
  noLoop();
}

function draw() {
  background(28, 110, 127)
  textSize(20)
  fill(255)
  // Graph title
  textStyle(BOLD)
  textAlign(CENTER)
  text('Solheimajokull Weather Data', windowWidth/2, 40);
  textAlign(LEFT)
  textSize(12)
  push()
  
  // convert dropdown value to integer for iteration
  selectValue = parseInt(select.value()) - 1;
  
  // switch data range for weekly grouping using parsed dropdown integer for iteration
  switch (select.value()) {
      case '1':
      activehumValues = humValues.slice((x), (y));
      activewindValues = windValues.slice((x), (y));
      activedateValues = windValues.slice((x), (y));
      break;
    /*case 'Choose a week':
      activehumValues = humValues.slice((x), (y));
      activewindValues = windValues.slice((x), (y));
      activedateValues = windValues.slice((x), (y));
      break;*/      
      default :
      activehumValues = humValues.slice((x + n * selectValue), (y + n * selectValue))
      activewindValues = windValues.slice((x + n * selectValue), (y + n * selectValue))
      activedateValues = windValues.slice((x + n * selectValue), (y + n * selectValue))
      //print(activedateValues)
  }
  
  // populate data array using active values from switch
  for(let i = 0; i < activedateValues.length; i++){
    // convert date to ddmmyyyy
    var dstring = (dateValues[0+i]);
    var dparts = dstring.split("/");
    var d = new Date(dparts[2] + '/' + dparts[1] + '/' + dparts[0]);
    //print(d)
    data.push(new Dataset(activehumValues[0+i], activewindValues[0+i], (d.getDay()+1)))
  }
  
  print(data)
  // graph location on screen
  translate(55, windowHeight/2 + 20)
  
  // derive bounds for graph from data
  let [min1, max1, min2, max2] = data.reduce(
    ([mn1, mx1, mn2, mx2], d) => [
      Math.min(mn1, d.value1),
      Math.max(mx1, d.value1),
      Math.min(mn2, d.value2),
      Math.max(mx2, d.value2)
    ], [Number.POSITIVE_INFINITY, 0, Number.POSITIVE_INFINITY, 0]
  );
 
  // adjust bar width
  let w = (width - 110) / data.length - 5;
  data.forEach((el, i) => {
    push()
    translate(i * (w + 5), 0);
    
    // draw bars and bar values  
    fill('black')
    rect(0, 0, w / 2, map(el.value1, 0, max1, 0, -150))

    fill(28, 110, 127)
    text(`${el.value1}`, 4, -10)
    text(`hum`, 1, -1)
    
    push()
    translate(w / 2, 0)

    fill('white')
    rect(0, 0, w / 2, map(el.value2, 0, max2, 0, -150))

    fill(28, 110, 127)
    text(`${el.value2}`, 10, -10)
    text(`win`, 6, -1)
    pop()

    // draw bar tags
    translate(w / 2 - 9, 20)
    fill(255)
    textStyle(ITALIC)
    text('Day ' + el.label, -12, -6)

    pop()
  });
  
  // draw week text using select value
  pop()
  if(isNaN(selectValue)){
    print('nan')
    textAlign(CENTER);
    text('No week selected ', windowWidth/2, windowHeight-150)
  }
  else{
    textAlign(CENTER);
    text('Week: ' + (selectValue + 1), windowWidth/2, windowHeight-150)
  }
}


// clear canvas, redraw on switch
function refresh(){
  print('redrawn');
  data = [];
  clear();
  textAlign(LEFT);
  redraw();
}

// The visualisation reveals thay on average, for a given 7-day period, wind speed would increase on days 1 and 2 and would then peak and fluctuate in the midweek before finally decreasing at the end of the period 