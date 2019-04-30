var mbsP = d3.csv("mbs1.csv")
var mdP = d3.csv("md.csv")

Promise.all([mbsP,mdP])
       .then(function(values){
       var mbsData = values[0]
       var mdData = values[1]
       drawBubble(mbsData)
       })

var drawBubble = function(mbsData){
  console.log(mbsData)
}
