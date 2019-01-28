# Process book
<b>Kimberley Boersma
Student no.: 11003464</b>

### <u>Jan 7, 2019:</u>
- Adjusted some things in my proposal
- Processed and converted dataset to JSON file with Pandas

I didn't commit my python script and processed data on this day because my dataset was too big to upload (I already emailed about this) but I did work on it.

### <u>Jan 8, 2019:</u>
- On this day I decided to filter my dataset down to data in the period 2000-2017 instead of using all the data (1970 - 2017) because my dataset was too big to work with
- I also filtered the 135 columns down to 61 columns with variables that looked most interesting to me
- I changed this time period (1970-2017 to 2000-2017) in my proposal as well
- Worked on my DESIGN.md
- Created globalterrorism.js and index.html to test if I could console.log and manipulate data

### <u>Jan 9, 2019:</u>
- Changed some main features in proposal
- Added:
-- donut chart
-- dropdown menu (countries)
-- slider (years)
-- dropdown check menu (categorial variable)
- Deleted:
-- Bar graph
-- Histogram and/or scatterplot
-- Two dropdowns (country and year)
- Added bar chart/histogram to "optional"
<i>Data is still not commited to github because file is too big but it does exist</i>

### <u>Jan 10, 2019:</u>
- Worked on prototype website
- Added 3 html pages: story, visualisations and info
- Added bootstrap navbar with links to 3 html pages
- Added carousel on index.html with a few pictures on subject terrorism
- Added grid to visualisations.html with some text and an example donut chart (not with own data)
- Added 3 javascript files and css file to folder scripts
- Added d3 folder with d3, d3-tip and legend

#### Index page:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/index_10-01-2019.png)
#### Visualisations page:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_10-01-2019.png)

### <u>Jan 11, 2019:</u>
On this day I didn't commit anything to github because I was working on my data again with the original dataset (158mb) so this was too big to commit again. I found out  that I had to reformat my data because I had to get the frequencies of some variables in a new dataframe (with pandas) and I was struggling with this a lot. My data looked like this:

#### Data:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/data_11-10-2019.png)

And I wanted it to look like this:

#### Processed Data:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/data_heads_11-10-2019.PNG)

### <u>Jan 14, 2019:</u>
So I finally got my data the way I wanted it as you can see in the picture above. I wanted to have different dataframes with the data I needed to make a worldmap, linegraph and donut chart. So I had to groupby some variables and count the rows or sum the values in a column. I finally succeeded with some help.

- Made a heatmap with number of terrorist attacks in the period of 2000-2017
- Made a donut chart with percentage of all the groups responsible for an attack per year per country
- I used a bootstrap grid to put my visualisations in there
- I had the problem that you could either see the worldmap or the donut chart on my visualisations page, depending on which one I loaded last in my visualisations.html
- So I found out this was because I needed to have 1 windows.onload in a main.js and call the worldmap and donut chart function in there
#### Visualisations page with worldmap:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_14-01-2019.png)
#### Visualisations page with donut chart:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_14-01-2019_v2.png)

### <u>Jan 15, 2019:</u>
- I processed my data for my linegraph and converted it to killsandwound.json
- I made a main.js where I call functions from my other .js files so there is only one windows.onload
- I made a line graph
#### Visualisations page:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_15-01-2019.png)

### <u>Jan 16, 2019:</u>
- Index page scrolls down when loading page
- Updated story page
- Worked on line graph
- Donut chart shows values small to large
#### Story page:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/story_16-01-2019.png)
#### Visualisations page:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_16-01-2019.png)

### <u>Jan 17, 2019:</u>
- Made dropdown menu on navbar for different countries (not all yet)
- Tried to make update function for line graph based on dropdown
- Didn't really work out (yet)
#### Visualisations page:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_17-01-2019.png)

### <u>Jan 18, 2019:</u>
- Played around with heatmap colours and max values
- In doubt whether to keep the legend the same throughout the years (so same max value) or if I should update the legend with every year
- Colours don't say alot if I don't update legend (see pic below)
- Thinking about defining colours in legend with uneven values like so: 0, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000
- Worked on process.py
#### Visualisations page:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_18-01-2019.png)

### <u>Jan 19, 2019:</u>
- Changed some stuff in linegraph.js
- Linegraph can now update with dropdown but it doesn't transition, just throws away svg and loads new one
- Would like to improve update function so I won't throw away svg every time, only update data and transition

### <u>Jan 21, 2019:</u>
- Haven't changed heatmap yet (legend)
- Still want to add year slider to heatmap but haven't had the time yet
- Been working on update function line graph but it's not perfect yet
- Hope to finish line graph with functioning update tomorrow
- As you can see in the page with the new script, when another country is chosen in the dropdown, the circles of the last country remain
#### Visualisations page with old script:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_21-01-2019_no_update.png)
#### Visualisations page with new script:
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_21-01-2019_with_update.png)

### <u>Jan 22, 2019:</u>
