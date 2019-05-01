var mbsP = d3.csv("mbs1.csv")
var mdP = d3.csv("md.csv")

Promise.all([mbsP,mdP])
       .then(function(values){
       var mbsData = values[0]
       var mdData = values[1]
       var date = 5
       drawBubbles(mbsData,mdData,date)
       })

var drawBubbles = function(mbsData,mdData,date){

 var screen={width:800,height:500};
 var margin = {top: 20, right: 60, bottom: 40, left: 70};
 var h=screen.height-margin.top-margin.bottom
 var w=screen.width-margin.right-margin.left

 var valArray = mbsData.map(function(mbsData){
   return parseFloat(mbsData.mbs);
 })
 var dateArray = mbsData.map(function(mbsData){
   return new Date(mbsData.DATE);
 })

 var mdarray = mdData.map(function(mdData){
   return parseFloat(mdData.mdebt);
 })

var combine = function(d,v,m){
  var newarray = d.map(function(d,i){
    return {
      Date: d,
      mbs: v[i],
      mdebt: function(d,i){
        if (i = 0 || i % 3 == 0) {
        return m[i];
      }
      else { return 0;}
      }
    }
  })
  return newarray
}
 console.log(mdarray)
 var bubbleArray = combine(dateArray,valArray,mdarray)
 console.log(bubbleArray)
 var mbsAcum = function(mbsData,date){
   mbsArray1 = mbsData.slice(0,date+1)
   mbsArray = mbsArray1.map(function(mbsData,i){
     if (date >= i) {
              return parseFloat(mbsData.mbs);}
   })
   return mbsArray
}

 var svg = d3.select("body")
 	     .append("svg")
 	     .attr("width",w)
             .attr("height",h)


  var mbsTotal = mbsAcum(mbsData,date)
  var bubbleVal = mbsTotal.reduce(function(total, amount){
            return total + amount})
  console.log(bubbleVal)
  var circlearray = [bubbleVal]
  svg.selectAll("circle")
     .data(circlearray)
     .enter()
     .append("circle")
     .attr("cx", 200)
     .attr("cy", 250)
     .attr("r", function(bubbleVal){
       return Math.sqrt(bubbleVal);
     })
     .attr("fill", "green")

   svg.selectAll("text")
       .data(circlearray)
       .enter()
       .append("text")
       .text(function(bubbleVal){
              return bubbleVal;})
       .attr("x", 200)
       .attr("y", 250)
       .attr("font-family", "sans-serif")
       .attr("font-size", "15px")
       .attr("fill", "black");


   xScale = d3.scaleTime()
              .domain([
                d3.min(bubbleArray, function(d){ return d.Date;}),
                d3.max(bubbleArray, function(d){ return d.Date;})
              ])
              .range([400,w]);

   yScale = d3.scaleLinear()
              .domain([0, d3.max(bubbleArray, function(d) { return d.mbs;})])
              .range([h,0]);

   var line = d3.line()
                .x(function(d){return xScale(bubbleArray.Date);})
                .y(function(d){return yScale(bubbleArray.mbs);})

  console.log(bubbleArray.slice(0,date+1))
   svg.append("path")
      .datum(bubbleArray.slice(0,date+1))
      .attr("class","line")
      .attr("d", line);



}
