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
 var createArray = function(data){
 var newarray = data.map(function(d,i){
	return {
	 date: data.DATE[i],
	 mbs: data.mbs[i]
	}
 })
 return newarray
}

var mbsArray = createArray(mbsData)
console.log(mbsArray)
}
