function makeGraph(data, lift, sex, equipment, lifter){
  d3.select("#scatterplot").remove();

  selecteddata = []
  lifterList = []

  console.log(lifter)
  lengthOfArray= data.data.length


  if(equipment == "All"){
    if(sex == "all"){
      for(var i = 0; i < lengthOfArray; i++){
        selecteddata.push(data.data[i])
        if(data.data[i]["Name"].toUpperCase() == lifter.toUpperCase()){
          lifterList.push(data.data[i])
        }
      }
    }
    else if(sex != "all"){
      for(var i = 0; i < lengthOfArray; i++){
        if(data.data[i].Sex == sex){
          selecteddata.push(data.data[i])
          if(data.data[i]["Name"].toUpperCase() == lifter.toUpperCase()){
            lifterList.push(data.data[i])
          }
        }
      }
    }
  }

  if(equipment != "All"){
    if(sex == "all"){
      for(var i = 0; i < lengthOfArray; i++){
        if(data.data[i].Equipment == equipment){
        selecteddata.push(data.data[i])
        if(data.data[i]["Name"].toUpperCase() == lifter.toUpperCase()){
          lifterList.push(data.data[i])
        }
        }
      }
    }
    if(sex != "all"){
      for(var i = 0; i < lengthOfArray; i++){
        if(data.data[i].Equipment == equipment && data.data[i].Sex == sex){
        selecteddata.push(data.data[i])
        if(data.data[i]["Name"].toUpperCase() == lifter.toUpperCase()){
          lifterList.push(data.data[i])
        }
        }
      }
    }

  }

  // create margin for scatterplot
  var margin = {top: 20, right: 30, bottom: 30, left: 30},
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // create scale for x-axis
    var x = d3.scale.linear()
        .range([80, width - 200])

        // create domain by taking maximum off data
        .domain(d3.extent(selecteddata, function(d) { return Math.abs(parseFloat(d.BodyweightKg)); })).nice();

    // create scale for y-axis
    var y = d3.scale.linear()
        .range([height, 10])

        // create domain by taking maximum of all data
        .domain(d3.extent(selecteddata, function(d) { return Math.abs(parseFloat(d[lift])); })).nice();

    // create x-axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // create y-axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // create a svg element to draw scatter plot in
    var svg = d3.select("#scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "scatterplot")

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // create x-axis with lable
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("font-size","12px")
        .attr("x", width - 200)
        .attr("y", - 10)
        .style("text-anchor", "end")
        .text("Bodyweight(kg)");

    // create y-axis with lable
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(60, 0)")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("font-size","12px")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(lift)

    // create dots in scatterplot
    svg.selectAll(".dot")
        .data(selecteddata)
        .enter().append("circle")
        .attr("class", function(d){return (d.Name == lifter) ? "dot1" : "dot"})
        .attr("r", function(d) { return (d.BodyweightKg == 0 || d[lift] == 0) ? 0 : (d.Name == lifter) ? 5 : 2; })
        .attr("cx", function(d) { return isNaN(d.BodyweightKg) ? 0: x(d.BodyweightKg); })
        .attr("cy", function(d) { return y(d[lift]); })
        // .style("fill", function(d) { return color(cValue(d));})
        .on("click", function(d){ updateChart(svgChart, d, data)})
        .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9)
               .style("color", "black")
          tooltip.html("<strong>" + "<h1>" + d["Name"] + ": " + "Bodyweight: " + d["BodyweightKg"] + ", " + lift + ": " + d[lift] + "</h1>" + "</strong>")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
          })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });



    svg.selectAll('.dot1')
      .remove()

    console.log(lifterList)

    svg.selectAll('.dot1')
      .data(lifterList)
      .enter().append("circle")
      .attr("class", function(d){return "dot1"})
      .attr("r", function(d) { return (d.BodyweightKg == 0 || d[lift] == 0) ? 0 : (d.Name == lifter) ? 3 : 2; })
      .attr("cx", function(d) { return isNaN(d.BodyweightKg) ? 0: x(d.BodyweightKg); })
      .attr("cy", function(d) { return y(d[lift]); })
      // .style("fill", function(d) { return color(cValue(d));})
      .on("click", function(d){ updateChart(svg ,d, data)})
      .on("mouseover", function(d) {
        tooltip.transition()
             .duration(200)
             .style("opacity", .9)
             .style("color", "black")
        tooltip.html("<strong>" + "<h1>" + d["Name"] + ": " + "Bodyweight: " + d["BodyweightKg"] + ", " + lift + ": " + d[lift] + "</h1>" + "</strong>")
             .style("left", (d3.event.pageX + 5) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
        })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });


    // create scatterplot title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 3 + (margin.top / 2))
        .attr("text-anchor", "middle")
        .text("Scatterplot: Bodyweight vs " + lift + ", sex: " + sex + ", equipment: " + equipment)
        .style({"text-anchor":"middle", "font-family":"Arial", "font-weight":"800", "font-size": "12px"});
}

function setGraph() {
	main($('#lift').val(), $('#sex').val(), $('#equipment').val());
}
