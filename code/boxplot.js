function boxPlot(data, lift, sex){
  d3.select("#oldboxplot").remove();

  var labels = true;

  var margin = {top: 30, right: 50, bottom: 70, left: 50};
  var width = 800 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var min = Infinity,
      max = -Infinity;

  LiftList = []


  // iterate over data
  for(var info = 0; info < data.data.length; info++){
      equipment = data.data[info]["Equipment"]
      if(equipment == "Raw"){
        if(sex == "all"){
          LiftList.push({"Raw":data.data[info][lift],"Wraps":"","Single-ply":"","Multi-ply":""})
        }
        else if(sex != "all"){
          if(data.data[info]["Sex"] == sex){
            LiftList.push({"Raw":data.data[info][lift],"Wraps":"","Single-ply":"","Multi-ply":""})
          }
        }
      }

      if(equipment == "Wraps"){
        if(sex == "all"){
          LiftList.push({"Raw":"", "Wraps":data.data[info][lift], "Single-ply":"", "Multi-ply":""})
        }
        else if(sex != "all"){
          if(data.data[info]["Sex"] == sex){
            LiftList.push({"Raw":"","Wraps":data.data[info][lift],"Single-ply":"","Multi-ply":""})
          }
        }
      }

      if(equipment == "Single-ply"){
        if(sex == "all"){
          LiftList.push({"Raw":"", "Wraps":"", "Single-ply":data.data[info][lift], "Multi-ply":""})
        }
        else if(sex != "all"){
          if(data.data[info]["Sex"] == sex){
            LiftList.push({"Raw":"", "Wraps":"", "Single-ply":data.data[info][lift], "Multi-ply":""})
          }
        }
      }


      if(equipment == "Multi-ply"){
        if(sex == "all"){
          LiftList.push({"Raw":"", "Wraps":"", "Single-ply":"", "Multi-ply":data.data[info][lift]})
        }
        else if(sex != "all"){
          if(data.data[info]["Sex"] == sex){
            LiftList.push({"Raw":"", "Wraps":"", "Single-ply":"", "Multi-ply":data.data[info][lift]})
          }
        }
      }
  }



  var info = [];
  info[0] = [];
  info[1] = [];
  info[2] = [];
  info[3] = [];

  info[0][0] = "Raw";
  info[1][0] = "Wraps";
  info[2][0] = "Single-ply";
  info[3][0] = "Multi-ply";


  info[0][1] = [];
	info[1][1] = [];
	info[2][1] = [];
	info[3][1] = [];

  LiftList.forEach(function(d) {
    v1 = Math.floor(d["Raw"]),
    v2 = Math.floor(d["Wraps"]),
    v3 = Math.floor(d["Single-ply"]),
    v4 = Math.floor(d["Multi-ply"]);

    var rowMax = Math.max(v1, Math.max(v2, Math.max(v3,v4)))
    var rowMin = Math.min(v1, Math.max(v2, Math.max(v3,v4)))

    if(v1 > 0){
      info[0][1].push(v1);
    }
    if(v2 > 0){
      info[1][1].push(v2);
    }
    if(v3 > 0){
      info[2][1].push(v3);
    }
    if(v4 > 0){
      info[3][1].push(v4);
    }

    if (rowMax > max) max = rowMax;
		if (rowMin < min) min = rowMin;
  });

  var chart = d3.box(data, lift)
		.whiskers(iqr(1.5))
		.height(height)
		.domain([min, max])
		.showLabels(labels);

  var svg = d3.select("#boxplot").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr("class", "box")
    .attr("id", "oldboxplot")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.ordinal()
		.domain(info.map(function(d) { console.log(d); return d[0] } ) )
		.rangeRoundBands([0 , width], 0.7, 0.3);

  var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

  var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);

	var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


  svg.selectAll(".box")
      .data(info)
	    .enter().append("g")
		  .attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
      .call(chart.width(x.rangeBand()));

      // add a title
  	svg.append("text")
          .attr("x", (width / 2))
          .attr("y", 0 + (margin.top / 2))
          .attr("text-anchor", "middle")
          .text("Lifts per equipment, " + lift + ", sex: " + sex )
          .style({"text-anchor":"middle", "font-family":"Arial", "font-weight":"800", "font-size": "12px"});

  	 // draw y axis
  	svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
  		  .append("text") // and text1
        .attr("class", "label")
  		  .attr("transform", "rotate(-90)")
  		  .attr("y", 6)
  		  .attr("dy", ".71em")
  		  .style("text-anchor", "end")
  		  .style("font-size", "12px")
  		  .text("Kilograms");

  	// draw x axis
  	svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
  	    .append("text")
        .attr("class", "label")           // text label for the x axis
        .attr("x", (width / 2) )
        .attr("y",  10 )
  		  .attr("dy", ".71em")
        .style("text-anchor", "middle")
  		  .style("font-size", "12px")
        .text("Equipment");



}

function iqr(k) {
  return function(d, i) {
    var q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k,
        i = -1,
        j = d.length;
    while (d[++i] < q1 - iqr);
    while (d[--j] > q3 + iqr);
    return [i, j];
  };
}
