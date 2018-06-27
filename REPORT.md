# Report

Short description
------------------------------------
I made a scatterplot, barchart, boxplots and a radarchart. The scatterplot
shows the relation betweens contesters bodyweight and a lift. When clicked on a
dot, the personal results of this contesters in shown in the barchart. The
boxplot shows the results per equipment. When you click on a box in this boxplots,
the results per age devision can be seen in the spiderchart (for this devision).

![alt text](https://github.com/Markvdhoven/PowerliftProject/blob/master/doc/DESIGN1.JPG)

![alt text](https://github.com/Markvdhoven/PowerliftProject/blob/master/doc/DESIGN2.JPG)

Technical Design
-------------------------------------
First of all, the data is devided from A-Z based on the first letter of the first name of the lifters
seen in the visualisations. The user can select a different dataset by clicking on one of the buttons (AB, 
CD, ... ). The default dataset is the UV-dataset because this is the smallest one and will load the quickest.

When opening the page for the first time, the data will be read and visualized in the *main* function in 
main.js. The function *readData* is used when the data gets updated (say when the user changes the data 
from UV to AB). In *readData*, the functions *boxPlot*, *updateScatter* and *spiderChart* are called. Thus
the scatterplot gets updated and the boxPlot and spiderChart are being created. When the users selects 
a lift, sex and equipment and click on 'submit', this function will be activated. 

When the user clicks on a dot, it will call the function *setBar* in barchart.js and update the barchart 
and scatterplot accordingly. The function *setBar* is also being called when one looks up a competator 
in the searchbar. Now, the competator that is looked up will have a red dot in the scatterplot and 
the barchart is being drawn for this player. 



