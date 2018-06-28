/*
* Mark van den Hoven 10533133
* Here are functions that are correlated to the barchart visualisations
**/

/**
 * Creates svg element and bar chart for the first time
 * @param (array) lifter The lifter for which you want to create the barchart
 * @param (array) data The entire data of all lifters
 */
function makeBarChart(lifter, data){

  // remove old barchart if there is one
  window.svgChart = d3.select('#barchart')
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .attr("id", "oldbar")

  updateChart(svgChart, lifter, data)
}

/**
 * Updates the bar chart
 * @param (var) svg The svg element in which you want to update the barchart
 * @param (array) lifter The lifter for which you want to create the barchart
 * @param (array) data The entire data of all lifters
 */
function updateChart(svg, lifter, data){
  LifterList = makeLifterInfo(lifter, data)

  // this scale is used for both x-axis and bars
  var xscale = d3.scale.ordinal().rangeRoundBands([50, 250], .03)
    .domain(LifterList.map(function(d) { return d["lift"]; }));

  createAxis(svg, LifterList, xscale)

  createBars(svg, LifterList, xscale)

  svg.select(".title").remove()

  // create title
  svg.append("g")
    .attr("transform", "translate(" + (350/2) + ", 15)")
    .attr("class", "title")
    .append("text")
    .text("Lifts of " + lifter["Name"] + ", "+ lifter["Equipment"])
    .style({"text-anchor":"middle", "font-family":"Arial", "font-weight":"800", "font-size": "12px"});

}

/**
 * Formats data for the barchart
 * @param (var) svg The svg element in which you want to update the barchart
 * @param (array) lifter The lifter for which you want to create the barchart
 * @returns (list) LifterList A list of all info from one specific lifter
 */
function makeLifterInfo(lifter, data){
  LifterList = []

  // iterate over data
  for(var info = 0; info < data.data.length; info++){
    prop1 = "BodyweightKg"
    prop2 = "Best3BenchKg"
    prop3 = "Best3DeadliftKg"
    prop4 = "Best3SquatKg"

    // if data matches specific info push corresponding dict into array
    if(data.data[info]["Name"] == lifter.Name && data.data[info]["BodyweightKg"] == lifter["BodyweightKg"]
      && data.data[info]["Best3BenchKg"] == lifter["Best3BenchKg"]
      && data.data[info]["Best3SquatKg"] == lifter["Best3SquatKg"]
      && data.data[info]["Best3DeadliftKg"] == lifter["Best3DeadliftKg"]){
      LifterList.push({lift:prop1, value: data.data[info][prop1]})
      LifterList.push({lift:prop2, value: data.data[info][prop2]})
      LifterList.push({lift:prop3, value: data.data[info][prop3]})
      LifterList.push({lift:prop4, value: data.data[info][prop4]})
    }
  }


  return LifterList
}

/*
* Creates axis
**/
function createAxis(svg, LifterList, xscale){

  // create scale for y-axis
  var yscale = d3.scale.linear()
    .domain([d3.max(LifterList, function(d) {return parseInt(d["value"])}), 0])
    .range([0, 340]);

  // create x-axis
  var xAxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom");

  // call x-axis and attributes
  svg.append("g")
    .attr("width", 260)
    .attr("height", 200)
    .attr("class", "axis")
    .attr("transform", "translate(0," + 375 + ")")
    .call(d3.svg.axis()
      .scale(xscale)
      .orient("bottom"))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");

  // create y-axis
  var yAxis = d3.svg.axis()
    .scale(yscale)
    .orient("left")
    .ticks(5);

  svg.select(".y").remove()

  // call y-axis and attributes
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + 40 + ",30)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("x", 0)
    .attr("dy", ".35em")
    .attr("font-size", "11px")
    .style("text-anchor", "end")
    .text("Kilograms");
}

/*
* Creates bars
**/
function createBars(svg, LifterList, xscale){

  // create tooltip for hoovering
  // source: http://bl.ocks.org/Caged/6476579
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([10, 50])
    .html( function(d) {
      return "<strong>" + "<h1>"+ "<span style='color:black'>" + d["lift"] + ": " + d["value"] + "kg" + "</span>" + "</h1>" + "</strong>"
    })

  // call tooltip
  svg.call(tip);

  // create scale for bars
  var scale = d3.scale.linear()
    .domain([0, d3.max(LifterList, function(d) {return parseInt(d["value"]); })])
    .range([0, 340]);

  var bar = d3.select("#oldbar").selectAll(".bar")
    .data(LifterList, function(d) {return xscale(d["lift"]); })

  // create bar for each data-element
  bar.enter()
    .append("rect")
    .attr("fill", "green")
    .attr("class", "bar")
    .attr("x", function(d) { return xscale(d["lift"]); })
    .attr("y", function (d) {
      return 370  - scale(d["value"]);
    })
    .attr("width", function(d) {
        return 35;
    })
    .attr("height", function(d){
      return scale(d["value"]);
    })
    .attr("stroke", "orange")
    .attr("stroke-width", function(d) {
       return d/2;
     })
     // show tooltip when mouseover
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  bar.exit().remove();

  bar.transition()
     .duration(750)
     .attr("y", function(d) { return 370 - scale(d.value); })
     .attr("height", function(d) { return scale(d.value); });
}

/*
* Resets barchart and scatterplot when a lifter is being looked up in search bar
**/
function setBar(){
  d3.json(buttonValue, function(error, data) {
    if (error) throw error;

    var count = 0;

    // get search value
    var searchValue = document.getElementById("competetorName").value

    for(var i = 0; i < data.data.length; i++){
      if(data.data[i]["Name"].toUpperCase() == searchValue.toUpperCase()){
        updateChart(svgChart, data.data[i], data)
        count += 1;
      }
    }

    updateScatter(svgScatter, data, $('#lift').val(), $('#sex').val(), $('#equipment').val(), searchValue)

    // check if lifter exists
    if(count == 0) alert('No such competetor')
    if(count == 0) throw new Error('There is no such competator');

  })
}
