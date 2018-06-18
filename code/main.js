function main(lift, sex, equipment){
  d3.json("data/datashort2.json", function(error, data) {
    if (error) throw error;

    boxPlot(data, lift, sex)
    makeGraph(data, lift, sex, equipment, "none")
    console.log(data)
    makeBarChart(data.data[1], data)
    console.log("check", data.data[1])
    spiderChart(data, equipment, lift)


  })
}

main("Best3SquatKg", "M", "Raw")
