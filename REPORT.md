
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
There were a lot of challenges through this project. Before I began the actual programming, I wanted to use a lot more data that was available than I eventually used. As I stated in my DESIGN document, I wanted to make a multiple linegraph with lines of different countries in one graph. I wasn't able to do this after all because I didn't have enough time. I also wasn't able to use the data on the succesrates of the terrorist attacks. I did actually parse this data from the dataset but I didn't have time to implement this into my code, because I would have to change a lot of things in my linegraph. I also wanted to make a barchart with the amount of attacks in one year so you could see which months/days had a lot of attacks but I wasn't able to do this.<br>
The first challenge I had was parsing my data with pandas, because my dataset was so big and I wasn't that experienced with pandas yet. Through this project I actually improved my skills in pandas.<br>
I actually did implement everything that I showed in my diagram of my design document because I was kind of playing it on the safe side when I was making that diagram. What I had in mind was a lot more than I have accomplished. This was due to the time constraint, but also because I had been struggling with using an update and transition for my linegraph and donutchart. This prevented me from being able to create extra visualisations.<br>
An important change that I made was changing the time period of my dataset from 2000-2017 to 1990-2017. At first I chose the previous time period because my dataset was so big and I wanted to make it as small as possible without using a ridiculously small time period (like 5 years). After that I found out that during processing and parsing my data, I didn't need to have such a big dataset to use in my .js files anyway, because I wanted a seperate .json file for every type of data (terroristgroups, amount of attacks, target types etc.) That's why I chose to make the time period of my data bigger so I could show some more data on my website.<br>
I also changed the colors of my heatmap because my heatmap was looking rather yellow because I had a few outliers and the rest of the world had very low values. So I changed the cutoff values for the colours, and didn't use a colour gradient for my legend anymore but just set colours.<br>
I also decided to give my linechart an onclick function which updates the worldmap and donutchart which I didn't plan on before because I thought this would add a little more "linkedness" to my 3 visualisations. Because at first, you could only click on the worldmap, and choose something in the 2 dropdowns. I felt like my linegraph and donutchart weren't "linked enough" so I added this feature so that the user can update the year of the donut by clicking on the circles on the lines.<br>
Another challenge that I had was that my timeslider wouldn't update when I changed the country by clicking on the circles of my linegraph. I almost considered taking this functionality away because I didn't want my website to be buggy, but eventually I got it to work (with a little help).<br>
I almost forgot to mention that another big change I made was to add 3 more variables to display in my donutchart. I know I mentioned this in my design.md but I didn't think I would have enough time to do this. I added this quite late to my project but eventually my donutchart could display 4 categorial variables instead of 1.<br>

### Defense
During this project I made some tradeoffs and changed some things which I hadn't planned on. I didn't implement a full update function for my linegraph and donutchart because I worked on this for almost 2 weeks, and I couldn't get it to work. My graphs would start to get buggy when I did use my update functions and so I decided to not use the update function and instead focus on adding more data to my donutchart and make the timeperiod bigger (27 years instead of 17 years) because I felt like I would rather have a website that fully works without update functions than a buggy website. I think this was a good tradeoff eventually because I think my visualisations would have been a lot simpler if I had focused on the update functions and not on adding more data. I also implemented an onclick function to my linegraph which I probably wouldn't have gotten round to if I had focused on these update and transition functions.
I made these changes because through the course of this project, I learned about things that were important and things that were less important for me. To me, it was important to visualize as much data as I could and inform the user as much as I could. Now I know I only used 20% of the data in the dataset, but I would've used less if I had focused on making my visualisations "pretty".<br>
In an ideal world, if I had buckets of time, I would definitely try to use more data from the dataset. I would want to give users the choice of actually comparing countries to each other in different visualisations like in a linegraph. I would also use update and transitions instead of drawing the linegraph/donutchart from scratch every time. I would've also really liked visualize recent terrorist attacks and link these to the actual news reports so people can really get more in-depth information about individual attacks. However, we only had 3-4 weeks so eventually I learned a lot through this course and I think that's the most important!
