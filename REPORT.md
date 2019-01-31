
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
![alt text](https://github.com/kim66003/project/blob/master/doc/process/repo_structure.PNG)

Diagram to show file structure:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/finaldesign.PNG)




### Challenges

### Defense
