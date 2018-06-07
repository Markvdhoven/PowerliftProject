function main(lift, sex, equipment){
  d3.json("data/datashort2.json", function(error, data) {
    if (error) throw error;

    makeGraph(data, lift, sex, equipment)
  })
}
