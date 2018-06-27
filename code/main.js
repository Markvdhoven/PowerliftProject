// default data when opening visualisations for the first time
var buttonValue = "data/powerliftdataUV.json"

/**
 * Main function which creates visualisations for the first time
 * @param (string) lift The lift for which you want to create visualisations
 * @param (string) sex The gender for which you want to create visualisations
 * @param (string) equipment The equipment for which you want to create visualisations
 */
function main(lift, sex, equipment){
  d3.json(buttonValue, function(error, data) {
    if (error) throw error;

    boxPlot(data, lift, sex)
    makeGraph(data, lift, sex, equipment, "none")

    makeBarChart(data.data[1], data)

    spiderChart(data, equipment, lift)
  })
}


main("Best3SquatKg", "M", "Raw")

/**
 * Functions that creates new visualisations based on data selected
 */
function buttonMainAB(){
  window.buttonValue = document.getElementById("clickAB").value
  readData(buttonValue)
}
function buttonMainCD(){
  window.buttonValue = document.getElementById("clickCD").value
  readData(buttonValue)
}
function buttonMainEF(){
  window.buttonValue = document.getElementById("clickEF").value
  readData(buttonValue)
}
function buttonMainGH(){
  window.buttonValue = document.getElementById("clickGH").value
  readData(buttonValue)
}
function buttonMainIJ(){
  window.buttonValue = document.getElementById("clickIJ").value
  readData(buttonValue)
}
function buttonMainKL(){
  window.buttonValue = document.getElementById("clickKL").value
  readData(buttonValue)
}
function buttonMainMN(){
  window.buttonValue = document.getElementById("clickMN").value
  readData(buttonValue)
}
function buttonMainOP(){
  window.buttonValue = document.getElementById("clickOP").value
  readData(buttonValue)
}
function buttonMainQR(){
  window.buttonValue = document.getElementById("clickQR").value
  readData(buttonValue)
}
function buttonMainST(){
  window.buttonValue = document.getElementById("clickST").value
  readData(buttonValue)
}
function buttonMainUV(){
  window.buttonValue = document.getElementById("clickUV").value
  readData(buttonValue)
}
function buttonMainWXYZ(){
  window.buttonValue = document.getElementById("clickWXYZ").value
  readData(buttonValue)
}

/**
 * Function that updates visualisations based on data selected
 */
function readData(buttonValue){
  lift = $('#lift').val()
  sex = $('#sex').val()
  let equipmentInReadData = $('#equipment').val()

  d3.json(buttonValue, function(error, data) {
    if (error) throw error;

    boxPlot(data, lift, sex)
    updateScatter(svgScatter, data, lift, sex, equipmentInReadData, "none")
    spiderChart(data, equipment, lift)
  })
}
