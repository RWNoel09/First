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
  var height = 500;
  var width = 750;
  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0])
  var xScale = d3.scaleLinear()
                 .domain([0,4])
                 .range([0,width])
  var barWidth = (width/data.length)
  var svg = d3.select('svg')
              .attr("width", width)
              .attr("height", height);
  svg.selectAll('rect')
     .data(data[0].grades)
     .enter()
     .append("rect")
     .attr("x", function(d,i){
       return i * xScale + 10;
     })
     .attr("y", function(d){
       return height - d.grade;
     })
     .attr("height", function(d){
       return d.grade;
     })
     .attr("width", barWidth)
     .attr("fill", "blue");



}
