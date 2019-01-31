
# Global Terrorism

### Description
This is my visualisations page on the subject Global Terrorism. There are three linked views: a worldmap, a multiple linegraph and a donutchart. The worldmap shows the number of terrorist incidents in the world. The linegraph shows the number of fatalities, non-fatal injuries and terrorist incidents. Finally the donut can show 4 types of categorial data: terrorist groups, attack types, target types and weapon types.
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_30-01-2019.png)

### Technical Design

<u>Code functionality</u>
Data Processing:

- I downloaded the original dataset and processed it with Pandas in Python
- I wrote all my data files to the "data" folder, if it was a .csv file to the "csv" subfolder, and if it was a .json file to the "json" subfolder

Data visualizations:

- Main.js to call all other functions (calls functions from: helpers.js, heatmap.js, linegraph.js and donut.js)
- Index.js to scroll the index page down onload (only used in index.html)
- Helpers.js with some helpers functions
- Heatmap.js with all the code for the worldmap
- Linegraph.js with all the code for the multiple linegraph
- Donut.js with all the code for the donutchart
- Countryhtml.py to write 193 lines of html code to a .txt file

HTML pages:
- Index.html shows the homepage with a slider of some pictures
- Story.html shows the storypage with the problem and solution
- Visualisations.html shows the visualisations (3 linked views, 2 dropdowns, 1 timeslider)
- Info.html shows the info page with contact details and demo video

Style folder: contains a style.css for the html pages and heatmap.css, donutchart.css, linegraph.css to style the visualisations

My folder structure:
![alt text](https://github.com/kim66003/project/blob/master/doc/report/repo_structure.PNG)

Diagram to show file structure:
![alt text](https://github.com/kim66003/project/blob/master/doc/report/finaldesign.PNG)

### Design in detail
<b>Main.js:</b>
Calls functions from:
- Helpers.js (catDrop and countryDrop)
- Heatmap.js (showHeatMap)
![alt text](https://github.com/kim66003/project/blob/master/doc/report/main.png)
<b>Index.js:</b>
- Contains function that scrolls window down when index page is loaded
- Changes text in country and category dropdown menus on selection
<b>Helpers.js:</b>
- Contains functions: catDrop() and countryDrop(), these are called when another value is selected in one of the dropdown menus
- CatDrop() calls functions from: donut.js
- CountryDrop() calls functions from: linegraph.js
- Both functions don't return anything, only call other functions
![alt text](https://github.com/kim66003/project/blob/master/doc/report/helpers.png)
<b>Heatmap.js</b>
Contains functions:
- showHeatMap() which calls: getData2(), drawMap(), drawLegend(), drawSlider()
- getData2() returns 3 variables: events, max, color
- drawMap() draws heatmap and onclick function calls showLineGraph() and showDonut()
- drawLegend() draws legend of heatmap and adds text and axis
- drawSlider() makes timeslider and calls functions drawMap() and showDonut() to update for year
![alt text](https://github.com/kim66003/project/blob/master/doc/report/heatmap.png)

<b>Linegraph.js</b>
Contains functions:
- showLinegraph() which calls: makeDict() to format data
- makeDict()
- drawLineGraph()
- drawLegend()

- Within the function showLineGraph, some variables are defined like margin, width, height, opacity, stroke, x- and yScale, x- and yAxis, svg is created, color is defined (as list), tooltiptext (list), line and lines are defined.
- Then functions drawLineGraph() and drawLegend() are called when length of list of data is bigger than 0, if not, a text is drawn on svg saying there are no terrorist attacks for this country and this year.
![alt text](https://github.com/kim66003/project/blob/master/doc/report/linegraph.png)

<b>Donut.js</b>
Contains functions:
- showDonut() which calls getData() and drawDonut()
- drawDonut()
- makeDonutDict()
- getData()
- getAbv()
![alt text](https://github.com/kim66003/project/blob/master/doc/report/donut.png)

### Challenges
There were a lot of challenges through this project. Before I began the actual programming, I wanted to use a lot more data that was available than I eventually used. As I stated in my DESIGN document, I wanted to make a multiple linegraph with lines of different countries in one graph. I wasn't able to do this after all because I didn't have enough time. I also wasn't able to use the data on the succesrates of the terrorist attacks. I did actually parse this data from the dataset but I didn't have time to implement this into my code, because I would have to change a lot of things in my linegraph. I also wanted to make a barchart with the amount of attacks in one year so you could see which months/days had a lot of attacks but I wasn't able to do this.
I actually did implement everything that I showed in my diagram of my design document because I was kind of playing it on the safe side when I was making that diagram. What I had in mind was a lot more than I have accomplished. This was due to the time constraint, but also because I had been struggling with using an update and transition for my linegraph and donutchart. This prevented me from being able to create extra visualisations.
An important change that I made was changing the time period of my dataset from 2000-2017 to 1990-2017. At first I chose the previous time period because my dataset was so big and I wanted to make it as small as possible without using a ridiculously small time period (like 5 years). After that I found out that during processing and parsing my data, I didn't need to have such a big dataset to use in my .js files anyway, because I wanted a seperate .json file for every type of data (terroristgroups, amount of attacks, target types etc.) That's why I chose to make the time period of my data bigger so I could show some more data on my website.
I also changed the colors of my heatmap because my heatmap was looking rather yellow because I had a few outliers and the rest of the world had very low values. So I changed the cutoff values for the colours, and didn't use a colour gradient for my legend anymore but just set colours.

### Defense
