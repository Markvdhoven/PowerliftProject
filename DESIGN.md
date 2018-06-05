Data sources
======================

powerliftdata.csv, download zip here: [OpenPowerlifting](https://www.openpowerlifting.org/data.html). This is a relatively large (600.000+ columns) dataset, so there is also a shorter version (25.000 columns) in the datamap.

Diagram
======================

| Function name  | Location       | Function    |
| ------------- | ------------- | ------------ |
| getData       | Visualisation/main.js          | Unloads data  |
| callScatter   | Visualisation/main.js         | Calls scatterplot |
| callBarChart   | Visualisation/main.js         | Calls bar chart |
| callSpiderChart   | Visualisation/main.js         | Calls spider chart |
| callBoxPlot   | Visualisation/main.js         | Calls box plot |
| makeScatter   | Visualisation/makeScatter.js  | Makes scatterplort |
| makeAxesScatter | Visualisation/maxeScatter.js | Makes axes for scatterplot |
| makeBarChart  | Visualisation/makeBarChart.js  | Makes bar chart |
| makeAxesBarChart  | Visualisation/makeBarChart.js  | Makes axes for bar chart |
| makeSpiderChart | Visualisation/makeSpiderChart.js | Makes spider chart |
| makeBoxPlot | Visualisation/maxeBoxplot.js | Makes box plot |
| makeAxesBox | Visualisation/maxeBoxplot.js | Makes axes for boxplot |

Plugins
======================

d3-bar, d3-tip
