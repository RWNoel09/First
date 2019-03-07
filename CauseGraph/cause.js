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
  var width = 1500;
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
              return i * barWidth + 10;
            })
            .attr("y", function(d){
              return height - d.gini;
            })
            .attr("height", function(d){
              return d.gini;
            })
            .attr("width", barWidth)
            .attr("fill", "green");
   
  svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){
      return d.Country;
    })
    .attr("x", function(d, i){
      return i * barWidth + 5;
    })
    .attr("y", function(d){
      return height - d.gini + 15;
    })
    .attr("font-size", "12px")
    .attr("fill", "white");

}
