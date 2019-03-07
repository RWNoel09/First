var dataCSV = d3.csv(".csv");

dataJSON.then(function(data)
{
  console.log("data",data);
  drawChart(data, "#json");
  makeLegend(data, "#legendJ");
},
function(err)
{
  console.log(err);
});

dataCSV.then(function(dataSecond)
{
  console.log("data",dataSecond);
  drawChart(dataSecond, "#csv");
  makeLegend(dataSecond, "#legendCSV");
},
function(err)
{
  console.log(err);
});



var drawChart = function(data, name){
  var height = 200;
  var width = 400;
  var svg;
  var barWidth = (width/data.length)
  if (name === "#csv"){
    svg = d3.select("#csv")
    .attr("width", width)
    .attr("height", height);

  }
  else{
    svg = d3.select("#json")
    .attr("width", width)
    .attr("height", height);
  }

  svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
              return i * barWidth;
            })
            .attr("y", function(d){
              return height - d.num*10;
            })
            .attr("height", function(d){
              return d.num * 10;
            })
            .attr("width", barWidth)
            .attr("fill", function(d){
              return d.color;
            });
    svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){
      return d.num;
    })
    .attr("x", function(d, i){
      return i * barWidth + 25;
    })
    .attr("y", function(d){
      return height - d.num*10 + 8;
    })
    .attr("font-size", "9px")
    .attr("fill", "white");



}






var makeLegend = function(theData, name){
  var width = 200;
  var height = 200;
  var boxWidth = 10;
  var svg = d3.select(name)
              .attr("height", height)
              .attr("width", width);
  svg.selectAll("rect")
     .data(theData)
     .enter()
     .append("rect")
     .attr("x", function(d,i)
      { return 21;})
    .attr("y", function (d, i)
      { return (i+1)*15 + 9;})
    .attr("width", boxWidth)
    .attr("height", boxWidth-2)
    .attr("fill", function(d)
      { return d.color;})

svg.selectAll("text")
   .data(theData)
   .enter()
   .append("text")
   .text(function(d)
      { return d.color;})
   .attr("x", function(d,i)
      { return 45})
   .attr("y", function(d, i)
      { return (i+1)*15 + 19;})
   .attr("fill", "black")

}
