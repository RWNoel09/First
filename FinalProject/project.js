var mbsP = d3.csv("mbs1.csv")
var mdP = d3.csv("md.csv")

Promise.all([mbsP,mdP])
       .then(function(values){
       var mbsData = values[0]
       var mdData = values[1]
       drawBubble(mbsData)
       })

var drawBubble = function(mbsData){
	
 var screen={width:800,height:500};
 var margin = {top: 20, right: 60, bottom: 40, left: 70};
 var h=screen.height-margin.top-margin.bottom
 var w=screen.width-margin.right-margin.left
 var date = 0
 
 console.log(mbsData)
	
 var svg = d3.select("body")
 	     .append("svg")
 	     .attr("width",w)
             .attr("height",h)
	
 var createArray = function(data){
 var newarray = data.map(function(d,i){
	return {
	 date: data.d[0],
	 mbs: data.d.[1]
	}
 })
 return newarray
}
 
  var mbsArray = createArray(mbsData)
  console.log(mbsArray)
  var bubble = d3.pie();
  var outerRadius = 1.9452197*mbsData.mbs[date];
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
