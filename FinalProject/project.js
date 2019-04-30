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
	
 var svg = d3.select("body")
 	     .append("svg")
 	     .attr("width",w)
             .attr("height",h)
	
 var createArray = function(data){
 var newarray = data.map(function(d,i){
	return {
	 date: d[0],
	 mbs: d[1]
	}
 })
 return newarray
}
 
  var mbsArray = createArray(mbsData)
  console.log(mbsArray)
  var bubble = d3.pie();
  var mbsVal = mbsData[date]
  var outerRadius = 1.9452197*mbsVal.mbs;
  var innerRadius = 0;
  var arc = d3.arc()
	      .innerRadius(innerRadius)
	      .outerRadius(outerRadius)
  var arcs = svg.selectAll("g.arc")
		.data(bubble(mbsData.mbs[date]))
  		.enter()
  		.append("g")
  		.attr("class","arc")
  		.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
 arcs.append("path")
     .attr("fill", "green")
     .attr("d", arc)

 
}
