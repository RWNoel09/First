var dataCSV = d3.csv("../data.csv");

dataCSV.then(function(data)
{
  console.log("data",data);
  drawChart(data, "svg");
},
function(err)
{
  console.log(err);
});



var drawChart = function(data,){
  var height = 750;
  var width = 1000;
  var svg;
  var barWidth = (width/data.length)
    svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
              return i * barWidth;
            })
            .attr("y", function(d){
              return height - d.gini;
            })
            .attr("height", function(d){
              return d.gini;
            })
            .attr("width", barWidth)
            .attr("fill", "green");

}
