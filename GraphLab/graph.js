var dataset = d3.json("gradedatatime.json");

dataset.then(function(data)
{
  console.log("data",data);
  initChart(data);
},
function(err)
{
  console.log(err);
});

var initChart = function(data){
  var  screen =
  {
    height: 300,
    width: 500
  }
  var margins =
  {
    top:10,
    bottom:40,
    left:40,
    right:100,
  }
  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;
  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height, 0])
  var xScale = d3.scaleLinear()
                 .domain([0,4])
                 .range([0, width])
  var barWidth = (width/data.length + 50)
  var svg = d3.select('svg')
              .attr("width", screen.width)
              .attr("height", screen.height);
  var plot = svg.append('g')
                .attr("transform", "translate("+ margins.left + ", " + margins.top + ")");
  var stud =
    plot.selectAll('rect')
        .data(data[0].grades)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
       return xScale(i) + 10;
     })
     .attr("y", function(d){
       return  yScale(d.grade) + margins.top;
     })
     .attr("height", function(d){
       return height - yScale(d.grade);
     })
     .attr("width", barWidth)
     .attr("fill", "blue")
     .on('mouseover', function(d){
       d3.select(this)
         .attr("fill", "green");
     })
     .on("mouseout", function(d){
       d3.select(this)
         .attr("fill", "blue");
     })
     .append('text')
     .text(function(d){
       return d.name;
     })
     .attr("x", function(d,i){
       return i*barWidth;
     })
     .attr('y', function(d,i){
       return height;
     });

  var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(4);
  var yAxis = d3.axisLeft()
                  .scale(yScale);

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + margins.left + "," + (height + margins.top + 10) + ")")
     .call(xAxis);

   svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margins.left + ", " + (margins.top + 10) + ")")
        .call(yAxis);

 //var body = d3.select("body");
 //var cday = d3.selectAll("p")
                //.data(data[0].day)
                //.enter()
                //.append("text")
                //.text(function(d){
                  //return d;
                //})

}

var body = d3.select("body");
var button =
    d3.selectAll('button')
      .on('click', function(){
        if (this.class == "previous") { var choice = "previous"}
        else if (this.class == "next") {var choice = "next"}
        update(data,choice,plot,height,yScale);
        console.log("here")
      });

var update = function(data,choice,plot,height,yScale){
  var day = document.getElementById('day').textContent;
  if (choice == 'previous'){
    var newday = Number(day) - 2;
    var stud =
      plot.selectAll("rect")
          .data(data[newday].grades)
          .transition()
          .delay(1000)
          .duration(2000)
          .ease(d3.easeLinear)
          .attr('y', function(d) {
            return yScale(d.grade) + margins.top;
          })
          .attr("height", function(d){
            return height - yScale(d.grade);
          })
          var d = document.getElementById('day');
          p.innerText = newday + 1;
  }
  else if (choice == "next") {
    var newday = Number(day);
    var stud =
      plot.selectAll("rect")
          .data(data[newday].grades)
          .transition()
          .delay(1000)
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("y", function(d) {
            return height - yScale(d.grade);
          })
          newday = newday + 1;
          var d = document.getElementById('day');
          p.innerText = newday;
  }
};
