function spiderChart(data, equipment, lift){
  var w = 500,
	h = 500;

  var colorscale = d3.scale.category20();

  var scatterList = []
  var scatterListMen = []
  var scatterListWomen = []

  sumAvgMen = 0
  sumAvgWomen = 0

  avgMenJunior = selectDataUnder18(data, equipment, lift)[0]
  if(isNaN(selectDataUnder18(data, equipment, lift)[1])){
    avgWomenJunior = 0;
  }
  else avgWomenJunior = selectDataUnder18(data, equipment, lift)[1];

  sumAvgMen += avgMenJunior
  sumAvgWomen += avgWomenJunior


  avgMenAdolecents =  selectDataAge1toAge2(data, equipment, lift, 18, 36)[0]
  avgWomenAdolecents =  selectDataAge1toAge2(data, equipment, lift, 18, 36)[1]

  sumAvgMen += avgMenAdolecents
  sumAvgWomen += avgWomenAdolecents


  avgMenAdults =  selectDataAge1toAge2(data, equipment, lift, 36, 54)[0]
  avgWomenAdults =  selectDataAge1toAge2(data, equipment, lift, 36, 54)[1]

  sumAvgMen += avgMenAdults
  sumAvgWomen += avgWomenAdults


  avgMenMiddleAge =  selectDataAge1toAge2(data, equipment, lift, 54, 65)[0]

  if(isNaN(selectDataAge1toAge2(data, equipment, lift, 54, 65)[1])){
    avgWomenMiddleAge = 0
  }
  else avgWomenMiddleAge =  selectDataAge1toAge2(data, equipment, lift, 54, 65)[1];

  sumAvgMen += avgMenMiddleAge
  sumAvgWomen += avgWomenMiddleAge

  avgMenSeniors =  selectDataOver64(data, equipment, lift)[0]

  if(isNaN(selectDataOver64(data, equipment, lift)[1])){
    avgWomenSeniors = 0
  }
  else avgWomenSeniors =  selectDataOver64(data, equipment, lift)[1];


  sumAvgMen += avgMenSeniors
  sumAvgWomen += avgWomenSeniors


  scatterListMen.push({axis: "Juniors (18-)", value : avgMenJunior / sumAvgMen})
  scatterListWomen.push({axis: "Juniors (18-)", value : avgWomenJunior / sumAvgWomen})

  scatterListMen.push({ axis: "Adolocents (18 - 36)", value: avgMenAdolecents / sumAvgMen})
  scatterListWomen.push({ axis: "AdolocentsWomen (18 - 36)", value : avgWomenAdolecents / sumAvgWomen})

  scatterListMen.push({ axis: "Adults (36 - 54)", value: avgMenAdults / sumAvgMen})
  scatterListWomen.push({ axis:"Adults (36 - 54)", value : avgWomenAdults / sumAvgWomen})


  scatterListMen.push({ axis: "Middle age (54 - 65)", value : avgMenMiddleAge / sumAvgMen})
  scatterListWomen.push({ axis: "Middle age (54 - 65)", value: avgWomenMiddleAge / sumAvgWomen})

  scatterListMen.push({ axis: "Seniors (65+)", value : avgMenSeniors / sumAvgMen})
  scatterListWomen.push({ axis: "Seniors (65+)", value : avgWomenSeniors / sumAvgWomen})


  scatterList.push(scatterListMen)
  scatterList.push(scatterListWomen)


  var mycfg = {
    w: w,
    h: h,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
  }

RadarChart.draw("#chart", scatterList, mycfg);

var svg = d3.select('#chart')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

  makeLegend(svg, w, colorscale)

}

function selectDataUnder18(data, equipment, lift){
  var liftListMen = [];
  var liftListWomen = [];

  for(var info = 0; info < data.data.length; info++){
    if(data.data[info]["Equipment"] == equipment && parseInt(data.data[info]["Age"]) < 18){
      if(data.data[info]["Sex"] == "M"){
        liftListMen.push(data.data[info][lift])
      }
      else if(data.data[info]["Sex"] == "F"){
        liftListWomen.push(data.data[info][lift])
      }
    }
  }
  var sumMen = 0
  for(var i = 0; i<liftListMen.length; i++){
    if(!isNaN(parseInt(liftListMen[i]))){
      sumMen += parseInt(liftListMen[i])
    }
  }

  var avgMen = sumMen / liftListMen.length

  var sumWomen = 0
  for(var i = 0; i<liftListWomen.length; i++){
    if(!isNaN(parseInt(liftListWomen[i]))){
      sumWomen += parseInt(liftListWomen[i])
    }
  }

  var avgWomen = sumWomen / liftListWomen.length

  return [avgMen, avgWomen]
}

function selectDataAge1toAge2(data, equipment, lift, age1, age2){
  var scatterListMen = []
  var scatterListWomen = []

  var liftListMen = [];
  var liftListWomen = [];

  for(var info = 0; info < data.data.length; info++){
    if(data.data[info]["Equipment"] == equipment && parseInt(data.data[info]["Age"]) < age2 && parseInt(data.data[info]["Age"]) >= age1){
      if(data.data[info]["Sex"] == "M"){
        liftListMen.push(data.data[info][lift])
      }
      else if(data.data[info]["Sex"] == "F"){
        liftListWomen.push(data.data[info][lift])
      }
    }
  }
  var sumMen = 0
  for(var i = 0; i<liftListMen.length; i++){
    if(!isNaN(parseInt(liftListMen[i]))){
      sumMen += parseInt(liftListMen[i])
    }
  }

  var avgMen = sumMen / liftListMen.length

  var sumWomen = 0
  for(var i = 0; i<liftListWomen.length; i++){
    if(!isNaN(parseInt(liftListWomen[i]))){
      sumWomen += parseInt(liftListWomen[i])
    }
  }

  var avgWomen = sumWomen / liftListWomen.length

  return [avgMen, avgWomen]
}

function selectDataOver64(data, equipment, lift){
  var liftListMen = [];
  var liftListWomen = [];

  for(var info = 0; info < data.data.length; info++){
    if(data.data[info]["Equipment"] == equipment && parseInt(data.data[info]["Age"]) > 64){
      if(data.data[info]["Sex"] == "M"){
        liftListMen.push(data.data[info][lift])
      }
      else if(data.data[info]["Sex"] == "F"){
        liftListWomen.push(data.data[info][lift])
      }
    }
  }
  var sumMen = 0
  for(var i = 0; i<liftListMen.length; i++){
    if(!isNaN(parseInt(liftListMen[i]))){
      sumMen += parseInt(liftListMen[i])
    }
  }

  var avgMen = sumMen / liftListMen.length

  var sumWomen = 0
  for(var i = 0; i<liftListWomen.length; i++){
    if(!isNaN(parseInt(liftListWomen[i]))){
      sumWomen += parseInt(liftListWomen[i])
    }
  }

  var avgWomen = sumWomen / liftListWomen.length

  return [avgMen, avgWomen]
}

function makeLegend(svg, w, colorscale){
  //Create the title for the legend
  var text = svg.append("text")
  	.attr("class", "title")
  	.attr('transform', 'translate(90,0)')
  	.attr("x", w - 70)
  	.attr("y", 10)
  	.attr("font-size", "12px")
  	.attr("fill", "#404040")
  	.text("What % does a age-group lift (" + equipment + ")")
    .style({"text-anchor":"middle", "font-family":"Arial", "font-weight":"800", "font-size": "12px"});

  //Legend titles
  var LegendOptions = ['Male', 'Female'];

  //Initiate Legend
  var legend = svg.append("g")
  	.attr("class", "legend")
  	.attr("height", 100)
  	.attr("width", 200)
  	.attr('transform', 'translate(90,20)')
  	;

    //Create colour squares
    legend.selectAll('rect')
      .data(LegendOptions)
      .enter()
      .append("rect")
      .attr("x", w - 65)
      .attr("y", function(d, i){ return i * 20;})
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d, i){ return colorscale(i);})
      ;

  	//Create text next to squares
  	legend.selectAll('text')
  	  .data(LegendOptions)
  	  .enter()
  	  .append("text")
  	  .attr("x", w - 52)
  	  .attr("y", function(d, i){ return i * 20 + 9;})
  	  .attr("font-size", "11px")
  	  .attr("fill", "#737373")
  	  .text(function(d) { return d; })
  	  ;
}
