var dataP = d3.json('classData.json').then(function(data){

drawScatterplot(data)

})

var drawScatterplot = function(data){

var screen={width:650,height:420};
 var margin = {top: 20, right: 50, bottom: 40, left: 70};
 var h=screen.height-margin.top-margin.bottom
 var w=screen.width-margin.right-margin.left


var getFgradeArray=function(d){
  var FgradeArray = d.map(function(student){
   var finalarray = student.final.map(function(final){
     return final.grade})
   var finalgrade = finalarray.reduce(function(total, amount){
     return total + amount})
    var hwarray = student.homework.map(function(hw){
      return hw.grade})
    var hwgrade1 = hwarray.reduce(function(total, amount){
      return total + amount})
    var hwgrade = (hwgrade1/950)*100
    var quizarray = student.quizes.map(function(quiz){
      return quiz.grade})  
    var quizgrade1 = quizarray.reduce(function(total, amount){
      return total + amount})
    var quizgrade = (quizgrade1/380)*100
    var testarray = student.test.map(function(t){
      return t.grade})  
    var testgrade1 = testarray.reduce(function(total, amount){
      return total + amount})
    var testgrade = (testgrade1/200)*100
    var stugrade = 0.3*finalgrade + 0.4*testgrade + 0.15*quizgrade + 0.15*hwgrade
    return stugrade})
  return FgradeArray
}

 var getHgradeArray=function(d){
  var HgradeArray = d.map(function(student){
    var hwarray = student.homework.slice(0,7).map(function(hw){
     return hw.grade})
    var hwgrade1 = hwarray.reduce(function(total, amount){
     return total + amount})
    var hwgrade = (hwgrade1/350)*100     
    var quizarray = student.quizes.slice(0,14).map(function(quiz){
       return quiz.grade})  
    var quizgrade1 = quizarray.reduce(function(total, amount){
       return total + amount})
    var quizgrade = (quizgrade1/140)*100
    var testarray = student.test.slice(0,1).map(function(t){
       return t.grade})  
    var testgrade1 = testarray.reduce(function(total, amount){
       return total + amount})
    var testgrade = (testgrade1/100)*100
    var stugrade = (0.4*testgrade + 0.15*quizgrade + 0.15*hwgrade)/0.7
    return stugrade})
  return HgradeArray 
 }
 
 var getGradechange=function(f,h){
  var changearray = h.map(function(d,i){
   var change = f[i] - d
   var perchange = (change/d)*100
   return perchange})
  return changearray
 }

var penArray=["Bookworm","Crafty","Cyclist","Drunken","Easter","EBook","Farmer","Gentleman","Judo","Moana","Painter","Grill","Pharoh","Pilot","Pinga","Pixie","Sailor","Santa","Tauch","Tux","ValentineO","Valentine","Wizard"]
 
var addlabels = function(c,p){
 var newarray = c.map(function(d,i){
  return {
   change: c[i],
   penguin: p[i]
  }
 })
 return newarray
}
    
var FgradeArray = getFgradeArray(data)
console.log(FgradeArray)
var HgradeArray = getHgradeArray(data)
console.log(HgradeArray)
var gradechange1 = getGradechange(FgradeArray,HgradeArray)
var gradechange = addlabels(gradechange1,penArray)
console.log(gradechange)
console.log(gradechange1)
 
var svg = d3.select("body")
            .append("svg")
            .attr("width", screen.width)
            .attr("height", screen.height )
            .attr("id", "chart")

var div = d3.select("svg").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var chart=svg.append("g")
             .attr('transform', 'translate(' + margin.left + ',' + margin.top+ ')')

var xScale= d3.scaleLinear()
              .domain([0,23])
              .nice()
              .range([0,w]);

var yScale=d3.scaleLinear()
             .domain([-50,50])
             .range([h,margin.top])
             .nice();

chart.selectAll("circle")
     .data(gradechange)
     .enter()
     .append("circle")
     .attr("cx", function(d,i){return xScale(i+1)})
     .attr("cy", function(d){return yScale(d.change)})
     .attr("r", 5)
     .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.text(d.penguin)	
                .style("left", (d3.select(this).attr("cx")) + "px")		
                .style("top", (d3.select(this).attr("cy")) + "px");	
            })			
      .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
 
  var yAxis=d3.axisLeft(yScale)

  svg.append("g")
  .attr('id', 'yAxis')
  .call(yAxis)
  .attr('transform', 'translate(' + 70 + ',' + margin.top + ')')

  var xAxis=d3.axisBottom(xScale)
              .ticks(0)
              
  svg.append("g")
  .attr('id', 'xAxis')
  .call(xAxis)
  .attr('transform', 'translate(' + (margin.left)+ ',' + ((h/2)+margin.top+10) + ')')
 
  svg.append("text")
  .attr('x',margin.left-40)
  .attr('y',margin.top)
  .attr('id', 'PerChange')
  .text("Percentage Change")
  .style('font-size', 15)
 
   svg.append("text")
  .attr('x',margin.left+w-5)
  .attr('y',margin.top+(h/2)+12)
  .attr('id', 'Penguin')
  .text("Penguin")
  .style('font-size', 15)

}
