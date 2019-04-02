var dataP = d3.json('classData.json').then(function(data){

drawScatterplot(data)
console.log(data)
})

var drawScatterplot = function(data){

var screen={width:650,height:420};
 var margin = {top: 20, right: 10, bottom: 40, left: 70};
 var h=screen.height-margin.top-margin.bottom
 var w=screen.width-margin.right-margin.left


var getgradeArray=function(d){
  var gradearray = d.map(function(student){
    var finalgrade = student.final.grade
    var hwarray = student.homework.map(function(hw){
      return hw.grade})  
    var hwgrade = hwarray.reduce(function(total, amount){
      return ((total + amount)/950)*100})
    var quizarray = student.quizes.map(function(quiz){
      return quiz.grade})  
    var quizgrade = quizarray.reduce(function(total, amount){
      return ((total + amount)/380)*100})
    var testarray = student.test.map(function(t){
      return t.grade})  
    var testgrade = testarray.reduce(function(total, amount){
      return ((total + amount)/200)*100})
    var stugrade = 0.3*finalgrade + 0.4*testgrade + 0.15*quizgrade + 0.15*hwgrade
    return stugrade
  })
}

var gradeArray = getgradeArray(data)
}
