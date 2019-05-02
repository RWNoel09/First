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

 var screen={width:1500,height:400};
 var margin = {top: 20, right: 60, bottom: 40, left: 70};
 var h=screen.height-margin.top-margin.bottom
 var w=screen.width-margin.right-margin.left

 var valArray = mbsData.map(function(mbsData){
   var val = parseFloat(mbsData.mbs)
   return val;
 })
 var dateArray = mbsData.map(function(mbsData){
   return new Date(mbsData.DATE);
 })
 var mdarray = mdData.map(function(mdData){
   var md = parseFloat(mdData.mdebt)
   return (md/100000);
 }) 
 var inArray = incomeData.map(function(incomeData){
   var inc = parseFloat(incomeData.income)
   return (inc/10000);
 })
  var securArray = securData.map(function(securData){
   var sec = parseFloat(securData.secur)
   return (sec/1000000);
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
 
var colors = ["green","pink","orange","teal","red" ]
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


  var mbsTotal = mbsAcum(mbsData,date)
  var bubbleVal = mbsTotal.reduce(function(total, amount){
            return total + amount})

  var circlearray = [inArray[date],mdarray[date],valArray[date],securArray[date],unemployArray[date]]
  console.log(circlearray)
  svg.selectAll("circle")
     .data(circlearray)
     .enter()
     .append("circle")
     .attr("cx", function(d,i) { return (i*180) + 100;})
     .attr("cy", 250)
     .attr("r", function(d,i){
       return Math.sqrt(d)*10;
     })
     .attr("fill", function(d,i) { return colors[i];})

   svg.selectAll("text")
       .data(circlearray)
       .enter()
       .append("text")
       .text(function(d){
              return d;})
       .attr("x", function(d,i) { return (i*180) + 100;})
       .attr("y", 250)
       .attr("font-family", "sans-serif")
       .attr("font-size", "15px")
       .attr("fill", "black")
       .attr("id", "bubtext");


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

//timeline and legend     
       
  var timeScale = d3.scaleLinear()
                   .domain([0,56])
                   .range([0,1250]);
       
  var formatTime = d3.timeFormat("%b %y");
       
  var timeline = d3.select("body").append("svg")
       .attr('width', 1250)
       .attr('height', 320)
       .attr('id', 'timeline')
  
  var bubb = ["Income","Mortgage Debt","Mortgage-Backed Securities","Total Debt Securities","Unemployment"]
  var legend = timeline.append("g").attr('id', "legend")
  legend.selectAll("rect").data(bubb)
        .enter()
        .append("rect")
        .attr("x", function(d,i){return (i*200) + 5})
        .attr("y", 30)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", function(d,i) { return colors[i];})
       
  legend.selectAll("text").data(bubb)
        .enter()
        .append("text")
        .attr("x", function(d,i){return (i*200) + 55})
        .attr("y", 40)
        .attr("id", function(d,i){ return d})
        .text(function(d){return d})
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
  
  var time1 = timeline.append("g").attr('id', 'time1')

  time1.selectAll("text").data(dateArray.slice(0,56))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',100)
       .attr('id',function(d,i){return i} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "5px")
       .attr("fill", "black")
       .on("click",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
  
   var valArray = mbsData.map(function(mbsData){
   var val = parseFloat(mbsData.mbs)
   return val;
 })
 var dateArray = mbsData.map(function(mbsData){
   return new Date(mbsData.DATE);
 })
 var mdarray = mdData.map(function(mdData){
   var md = parseFloat(mdData.mdebt)
   return (md/100000);
 }) 
 var inArray = incomeData.map(function(incomeData){
   var inc = parseFloat(incomeData.income)
   return (inc/10000);
 })
  var securArray = securData.map(function(securData){
   var sec = parseFloat(securData.secur)
   return (sec/1000000);
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
 
var colors = ["green","pink","orange","teal","red" ]     
         
  var circlearray = [inArray[date],mdarray[date],valArray[date],securArray[date],unemployArray[date]]
  console.log(circlearray)
  svg.selectAll("circle")
     .data(circlearray)
     .enter()
     .append("circle")
     .attr("cx", function(d,i) { return (i*180) + 100;})
     .attr("cy", 200)
     .attr("r", function(d,i){
       return Math.sqrt(d)*10;
     })
     .attr("fill", function(d,i) { return colors[i];})

   svg.selectAll("text")
       .data(circlearray)
       .enter()
       .append("text")
       .text(function(d){
              return d;})
       .attr("x", function(d,i) { return (i*180) + 100;})
       .attr("y", 250)
       .attr("font-family", "sans-serif")
       .attr("font-size", "15px")
       .attr("fill", "black")
       .attr("id", "bubtext");
         
          })
              
                               
  var time2 = timeline.append("g").attr('id', 'time2')

  time2.selectAll("text").data(dateArray.slice(56,112))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',115)
       .attr('id',function(d,i){return i+56} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "5px")
       .attr("fill", "black")
       .on("click",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
  
   var valArray = mbsData.map(function(mbsData){
   var val = parseFloat(mbsData.mbs)
   return val;
 })
 var dateArray = mbsData.map(function(mbsData){
   return new Date(mbsData.DATE);
 })
 var mdarray = mdData.map(function(mdData){
   var md = parseFloat(mdData.mdebt)
   return (md/100000);
 }) 
 var inArray = incomeData.map(function(incomeData){
   var inc = parseFloat(incomeData.income)
   return (inc/10000);
 })
  var securArray = securData.map(function(securData){
   var sec = parseFloat(securData.secur)
   return (sec/1000000);
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
 
var colors = ["green","pink","orange","teal","red" ]    
         
  var circlearray = [inArray[date],mdarray[date],valArray[date],securArray[date],unemployArray[date]]
  console.log(circlearray)
  svg.selectAll("circle")
     .data(circlearray)
     .enter()
     .append("circle")
     .attr("cx", function(d,i) { return (i*180) + 100;})
     .attr("cy", 250)
     .attr("r", function(d,i){
       return Math.sqrt(d)*10;
     })
     .attr("fill", function(d,i) { return colors[i];})

   svg.selectAll("text")
       .data(circlearray)
       .enter()
       .append("text")
       .text(function(d){
              return d;})
       .attr("x", function(d,i) { return (i*180) + 100;})
       .attr("y", 250)
       .attr("font-family", "sans-serif")
       .attr("font-size", "15px")
       .attr("fill", "black")
       .attr("id", "bubtext");
         
          })
       
  var time3=timeline.append("g").attr('id', 'time3')

  time3.selectAll("text").data(dateArray.slice(112,169))
       .enter()
       .append("text")
       .attr('x', function(d,i){
         return timeScale(i)})
       .attr('y',220)
       .attr('id',function(d,i){return i+112} )
       .text(function(d){return formatTime(d)})
       .attr("font-family", "sans-serif")
       .attr("font-size", "5px")
       .attr("fill", "black")
             .on("click",function(){
              d3.selectAll("circle").remove()
              d3.selectAll("text#bubtext").remove()
              date=parseInt(d3.select(this).attr("id").replace(/[^0-9]/ig,""))
              console.log(date)
  
   var valArray = mbsData.map(function(mbsData){
   var val = parseFloat(mbsData.mbs)
   return val;
 })
 var dateArray = mbsData.map(function(mbsData){
   return new Date(mbsData.DATE);
 })
 var mdarray = mdData.map(function(mdData){
   var md = parseFloat(mdData.mdebt)
   return (md/100000);
 }) 
 var inArray = incomeData.map(function(incomeData){
   var inc = parseFloat(incomeData.income)
   return (inc/10000);
 })
  var securArray = securData.map(function(securData){
   var sec = parseFloat(securData.secur)
   return (sec/1000000);
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
 
 var colors = ["green","pink","orange","teal","red" ]     
         
  var circlearray = [inArray[date],mdarray[date],valArray[date],securArray[date],unemployArray[date]]
  console.log(circlearray)
  svg.selectAll("circle")
     .data(circlearray)
     .enter()
     .append("circle")
     .attr("cx", function(d,i) { return (i*180) + 100;})
     .attr("cy", 250)
     .attr("r", function(d,i){
       return Math.sqrt(d)*10;
     })
     .attr("fill", function(d,i) { return colors[i];})

   svg.selectAll("text")
       .data(circlearray)
       .enter()
       .append("text")
       .text(function(d){
              return d;})
       .attr("x", function(d,i) { return (i*180) + 100;})
       .attr("y", 250)
       .attr("font-family", "sans-serif")
       .attr("font-size", "15px")
       .attr("fill", "black")
       .attr("id", "bubtext");
         
          })

}
