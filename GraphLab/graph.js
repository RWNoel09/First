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

var initChart = function(data[0]){
  var height = 1000px;
  var width = 1500px;
  var barWidth = (width/data.length)
  var svg = d3.select('svg');
  svg.selectAll('rect')
     .data(data)
     .enter()
     .append("rect")
     .attr("x", function(d,i){
       return i * barWidth + 10;
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
