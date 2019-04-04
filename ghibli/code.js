dataP = d3.json("https://ghibliapi.herokuapp.com/locations")
dataP.then(function(data){
    var column = ["name", "climate", "terrain", "surface_water"]
    var columnH = ["Name", "Climate", "Terrain", "Surface Water"]
    drawTable(data, column, columnH)
});

var drawTable = function (data, column, columnH){
  var table = d3.select("body").append("table")
  var thead = table.append("thead")
  var tbody = table.append("tbody");

  thead.append('tr')
       .selectAll("th")
       .data(columnH)
       .enter()
       .append("th")
       .text(function(column){return column;})

  var rows = tbody.selectAll("tr")
                  .data(data)
                  .enter()
                  .append("tr")
                  .attr("id", "row");
  var cells = rows.selectAll("td")
                  .data(function (row) {
                    return column.map(function(column) {
                      return { column: column, value: row[column]};
                    })
                  })
                  .enter()
                  .append("td")
                  .text(function(d) {return d.value});
  return table;

}
