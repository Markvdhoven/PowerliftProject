function main(lift, sex, equipment){
  d3.json("data/datashort2.json", function(error, data) {
    if (error) throw error;

    boxPlot(data, lift, sex)
    makeGraph(data, lift, sex, equipment)

  })
}
