var mbsP = d3.csv("mbs1.csv")
var mdP = d3.csv("md.csv")
var incomeP = d3.csv("income.csv")
var totsecuritiesP = d3.csv("totsecurities.csv")
var unemployP = d3.csv("unemployment.csv")


Promise.all([mbsP,mdP,incomeP,totsecuritiesP,unemployP])
       .then(function(values){
       var mbsData = values[0]
       var mdData = values[1]
       var incomeData = values[2]
       var securData = values[3]
       var unemployData = values[4]
       var date = 5
       drawBubbles(mbsData,mdData,incomeData,securData,unemployData,date)
       })

var drawBubbles = function(mbsData,mdData,incomeData,securData,unemployData,date){

 var screen={width:1350,height:500};
 var margin = {top: 20, right: 0, bottom: 20, left: 0};
 var h=screen.height-margin.top-margin.bottom
 var w=screen.width-margin.right-margin.left

 var valArray = mbsData.map(function(mbsData){
   var val = parseFloat(mbsData.mbs)
   var val1 = (val/10)
   var val2 = val*0.5
   var val3 = val2.toPrecision(5)
   return val3;
 })
 var dateArray = mbsData.map(function(mbsData){
   return new Date(mbsData.DATE);
 })
 var mdarray = mdData.map(function(mdData){
   var md = parseFloat(mdData.mdebt)
   var md1 = (md/10000)
   var md2 = md1*0.9
   var md3 = md2.toPrecision(5)
   return md3;
 })
 var inArray = incomeData.map(function(incomeData){
   var inc = parseFloat(incomeData.income)
   var inc1 = (inc/1000)
   var inc2 = inc1*0.2
   var inc3 = inc2.toPrecision(5)
   return inc3;
 })
  var securArray = securData.map(function(securData){
    var sec = parseFloat(securData.secur)
    var sec1 = (sec/100000)
    var sec2 = sec1*0.8
    var sec3 = sec2.toPrecision(5)
    return sec3;
 })
  var unemployArray = unemployData.map(function(unemployData){
   var un = parseFloat(unemployData.unemploy)
   return (un/1000);
 })

var combine = function(d,v,m,n,s,u){
  var newarray = d.map(function(d,i){
    return {
      Date: d,
      mbs: v[i],
      mdebt: m[i],
      income: n[i],
      secur: s[i],
      unemploy: u[i]
    }
  })
  return newarray
}

var combine2 = function(circle,data){
  var newArray = circle.map(function(d,i){
    return {
      circle: d,
      data: data[i] 
    }
  })
  return newArray
}

var colors = ["#196F3D","#FF33B2","#D35400","#1F618D","#7B241C" ]
 var bubbleArray = combine(dateArray,valArray,mdarray,inArray,securArray,unemployArray)
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
            .attr("id", "plot")

 var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

  var mbsTotal = mbsAcum(mbsData,date)
  var bubbleVal = mbsTotal.reduce(function(total, amount){
            return total + amount})
  var bubb = ["Income","Mortgage Debt","Mortgage-Backed Securities","Total Debt Securities","Unemployment"]
  var dataArray = [parseFloat(incomeData[date].income),parseFloat(mdData[date].mdebt)*1000,parseFloat(mbsData[date].mbs)*1000000,parseFloat(securData[date].secur)*1000,parseFloat(unemployData[date].unemploy)]
  console.log(dataArray)
  var circlearray = [inArray[date],mdarray[date],valArray[date],securArray[date],unemployArray[date]]
  console.log(circlearray)
  var finalArray = combine2(circlearray,dataArray)
  console.log(finalArray)
  svg.selectAll("circle")
     .data(finalArray)
     .enter()
     .append("circle")
     .attr("cx", function(d,i) { return (i*260) + 120;})
     .attr("cy", 200)
     .attr('id', function(d,i){return "circle" + i;})
     .attr("r", function(d,i){
       return Math.sqrt(d.circle)*10;
     })
     .attr("fill", function(d,i) { return colors[i];})
     .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.text("$" + d.data)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })			
      .on("mouseout", function(d,i) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
       

   svg.selectAll("text")
       .data(circlearray)
       .enter()
       .append("text")
       .text(function(d,i){
        return bubb[i];})
       .attr("x", function(d,i) {
         if (i == 0){ return 95;}
         if (i == 1){ return 330;}
         if (i == 2){ return 545.5;}
         if (i == 3){ return 831;}
         if (i == 4){ return 1109;}
       })
       .attr("y", 200)
       .attr("font-family", "sans-serif")
       .attr("font-size", "15px")
       .attr("fill", "white")
       .attr("id", "bubtext");


   //xScale = d3.scaleTime()
              //.domain([
                //d3.min(bubbleArray, function(d){ return d.Date;}),
                //d3.max(bubbleArray, function(d){ return d.Date;})
              //])
              //.range([400,w]);

   //yScale = d3.scaleLinear()
              //.domain([0, d3.max(bubbleArray, function(d) { return d.mbs;})])
              //.range([h,0]);

   //var line = d3.line()
                //.x(function(d){return xScale(bubbleArray.Date);})
                //.y(function(d){return yScale(bubbleArray.mbs);})

  //console.log(bubbleArray.slice(0,date+1))
   //svg.append("path")
      //.datum(bubbleArray.slice(0,date+1))
      //.attr("class","line")
      //.attr("d", line);

var update = function(date){

var valArray = mbsData.map(function(mbsData){
  var val = parseFloat(mbsData.mbs)
  var val1 = (val/10)
  var val2 = val*0.5
  var val3 = val2.toPrecision(5)
  return val3;
})
var dateArray = mbsData.map(function(mbsData){
return new Date(mbsData.DATE);
})
var mdarray = mdData.map(function(mdData){
  var md = parseFloat(mdData.mdebt)
  var md1 = (md/10000)
  var md2 = md1*0.9
  var md3 = md2.toPrecision(5)
  return md3;
})
var inArray = incomeData.map(function(incomeData){
  var inc = parseFloat(incomeData.income)
  var inc1 = (inc/1000)
  var inc2 = inc1*0.2
  var inc3 = inc2.toPrecision(5)
  return inc3;
})
var securArray = securData.map(function(securData){
var sec = parseFloat(securData.secur)
var sec1 = (sec/100000)
var sec2 = sec1*0.8
var sec3 = sec2.toPrecision(5)
return sec3;
})
var unemployArray = unemployData.map(function(unemployData){
var un = parseFloat(unemployData.unemploy)
return (un/1000);
})

var combine = function(d,v,m,n,s,u){
var newarray = d.map(function(d,i){
return {
Date: d,
mbs: v[i],
mdebt: m[i],
income: n[i],
secur: s[i],
unemploy: u[i]
}
})
return newarray
}

var combine2 = function(circle,data){
  var newArray = circle.map(function(d,i){
    return {
      circle: d,
      data: data[i] 
    }
  })
  return newArray
}
var bubb = ["Income","Mortgage Debt","Mortgage-Backed Securities","Total Debt Securities","Unemployment"]
var colors = ["#196F3D","#FF33B2","#D35400","#1F618D","#7B241C" ]
var dataArray = [parseFloat(incomeData[date].income),parseFloat(mdData[date].mdebt)*1000,parseFloat(mbsData[date].mbs)*1000000,parseFloat(securData[date].secur)*1000,parseFloat(unemployData[date].unemploy)]
var circlearray = [inArray[date],mdarray[date],valArray[date],securArray[date],unemployArray[date]]
console.log(circlearray)
var finalArray = combine2(circlearray,dataArray)      
svg.selectAll("circle")
.data(finalArray)
.enter()
.append("circle")
.attr("cx", function(d,i) { return (i*260) + 120;})
.attr("cy", 200)
.attr("r", function(d,i){
return Math.sqrt(d.circle)*10;
})
.attr("fill", function(d,i) { return colors[i];})
.on("mouseover", function(d,i) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.text("$" + d.data)
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY) + "px");	
            })			
.on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });


svg.selectAll("text")
.data(circlearray)
.enter()
.append("text")
.text(function(d,i){
    return bubb[i];})
.attr("x", function(d,i) {
  if (i == 0){ return 95;}
  if (i == 1){ return 330;}
  if (i == 2){ return 545.5;}
  if (i == 3){ return 831;}
  if (i == 4){ return 1109;}
})
.attr("y", 200)
.attr("font-family", "sans-serif")
.attr("font-size", "15px")
.attr("fill", "white")
.attr("id", "bubtext");

  }

//timeline and legend

  var timeScale = d3.scaleLinear()
                   .domain([0,24])
                   .range([0,1250]);

  var formatTime = d3.timeFormat("%b %y");

  var timeline = d3.select("body").append("svg")
       .attr('width', 1250)
       .attr('height', 300)
       .attr('id', 'timeline')

  var bubb = ["Income","Mortgage Debt","Mortgage-Backed Securities","Total Debt Securities","Unemployment"]
  //var legend = timeline.append("g").attr('id', "legend")
  //legend.selectAll("rect").data(bubb)
        //.enter()
        //.append("rect")
        //.attr("x", function(d,i){return (i*250) + 85})
        //.attr("y", 30)
        //.attr("width", 20)
        //.attr("height", 20)
        //.attr("fill", function(d,i) { return colors[i];})

  //legend.selectAll("text").data(bubb)
        //.enter()
        //.append("text")
        //.attr("x", function(d,i){return (i*250) + 110})
        //.attr("y", 40)
        //.attr("id", function(d,i){ return d})
        //.text(function(d){return d})
        //.attr("font-family", "sans-serif")
        //.attr("font-size", "10px")
        //.attr("fill", "white")
        //.attr("id", "legtext")
  
  var header = timeline.append("g")
  header.append("text").attr("x", 15).attr("y",5).text("Date").attr("font-family", "sans-serif").attr("font-size", "12px").attr("fill", "white")

  var time1 = timeline.append("g").attr('id', 'time1')

  time1.selectAll("text").data(dateArray.slice(0,23))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',15)
       .attr('id',function(d,i){return i} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "white")
       .on("mouseover",function(){
         d3.selectAll("circle").remove()
         d3.selectAll("text#bubtext").remove()
         date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
         console.log(date)
         update(date)
       })



  var time2 = timeline.append("g").attr('id', 'time2')

  time2.selectAll("text").data(dateArray.slice(23,47))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',45)
       .attr('id',function(d,i){return i+23} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "white")
       .on("mouseover",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
              update(date)
            })


  var time3=timeline.append("g").attr('id', 'time3')

  time3.selectAll("text").data(dateArray.slice(47,71))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',75)
       .attr('id',function(d,i){return i+47} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "white")
       .on("mouseover",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
              update(date)

          })
       
  var time4=timeline.append("g").attr('id', 'time4')

  time4.selectAll("text").data(dateArray.slice(71,95))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',105)
       .attr('id',function(d,i){return i+71} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "white")
       .on("mouseover",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
              update(date)

          })
       
  var time5=timeline.append("g").attr('id', 'time5')

  time5.selectAll("text").data(dateArray.slice(95,119))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',135)
       .attr('id',function(d,i){return i+95} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "white")
       .on("mouseover",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
              update(date)

          })
       
  var time6=timeline.append("g").attr('id', 'time6')

  time6.selectAll("text").data(dateArray.slice(119,144))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',165)
       .attr('id',function(d,i){return i+119} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "white")
       .on("mouseover",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
              update(date)

          })
       
  var time7=timeline.append("g").attr('id', 'time7')

  time7.selectAll("text").data(dateArray.slice(144,169))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',195)
       .attr('id',function(d,i){return i+144} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "12px")
       .attr("fill", "white")
       .on("mouseover",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
              update(date)

          })  

}
