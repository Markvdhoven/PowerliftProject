function spiderChart(data, equipment, lift){
  var w = 500,
	h = 500;

  var colorscale = d3.scale.category10();

  //Legend titles
  var LegendOptions = ['Male', 'Female'];

  console.log(data, equipment, lift)

  var scatterList = []

  var scatterListMen = []
  var scatterListWomen = []

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
  console.log(liftListMen)
  console.log(liftListWomen)
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

  scatterListMen.push({"<18" : avgMen})
  scatterListWomen.push({"<18" : avgWomen})

  scatterList.push(scatterListMen)
  scatterList.push(scatterListWomen)


  console.log(scatterList)
}
