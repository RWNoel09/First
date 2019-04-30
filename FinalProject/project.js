var mbsP = d3.csv("mbs1.csv")
var mdP = d3.csv("md.csv")

Promise.all([mbsP,mdP])
       .then(function(values){
       var mbsData = values[0]
       var mdData = values[1]
       var date = 0
       drawBubble(mbsData,date)
       })

var drawBubble = function(mbsData,date){

 var screen={width:800,height:500};
 var margin = {top: 20, right: 60, bottom: 40, left: 70};
 var h=screen.height-margin.top-margin.bottom
 var w=screen.width-margin.right-margin.left


 console.log(mbsData)
 var valArray = mbsData.map(function(mbsData){
   return parseFloat(mbsData.mbs);
 })
 var dateArray = mbsData.map(function(mbsData){
   return mbsData.DATE;
 })

 var mbsAcum = function(mbsData,date){
   mbsArray1 = mbsData.slice(0,date+1)
   console.log(mbsArray1)
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
  console.log(mbsTotal)
  var bubbleVal = mbsTotal.reduce(function(total, amount){
            return total + amount})
  console.log(bubbleVal)
  var bubbleArray = [1]
  svg.selectAll("circle")
     .data(bubbleArray)
     .enter()
     .append("circle")
     .attr("cx", 200)
     .attr("cy", 250)
     .attr("r", bubbleVal)
     .attr("fill", "green")
       
   svg.selectAll("text")
       .data(bubbleArray)
       .enter()
       .append("text")
       .text(function(d){
              return bubbleVal;})
       .attr("x", 200)
       .attr("y", 250)
       .attr("font-family", "sans-serif")
       .attr("font-size", "15px")
       .attr("fill", "black");


   xScale = d3.scaleTime()
              .domain([
                d3.min(dateArray, function(d){ return d;}),
                d3.max(dateArray, function(d){ return d;})
              ])
              .range([400,w]);

   yScale = d3.scaleLinear()
              .domain([0, d3.max(valArray, function(d) {return d;})])
              .range([h,0]);


}
