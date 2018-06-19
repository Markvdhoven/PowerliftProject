var buttonValue = "data/powerliftdataAB.json"

function main(lift, sex, equipment){
  d3.json(buttonValue, function(error, data) {
    if (error) throw error;

    boxPlot(data, lift, sex)
    makeGraph(data, lift, sex, equipment, "none")

    makeBarChart(data.data[1], data)

    spiderChart(data, equipment, lift)


  })
}
//
main("Best3SquatKg", "M", "Raw")


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

function readData(buttonValue){
  lift = $('#lift').val()
  sex = $('#sex').val()
  equipment = $('#equipment').val()


  d3.json(buttonValue, function(error, data) {
    if (error) throw error;

    boxPlot(data, lift, sex)
    makeGraph(data, lift, sex, equipment, "none")
    makeBarChart(data.data[1], data)
    spiderChart(data, equipment, lift)
  })
}
