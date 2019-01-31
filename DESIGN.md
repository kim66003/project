## Design project: Global Terrorism
#### Data source and processing
For this project I will use the Global Terrorism Database from kaggle.com.
Link to datasource: [Global Terrorism Database](https://www.kaggle.com/START-UMD/gtd "Global Terrorism Database | Kaggle")

This is a database with records of terrorist attacks within the period 1970 - 2017 in a csv file. The initial database was very large, too large to upload to github, and so I decided to filter the data for the years 2000 - 2017. This data probably is more relevant to the user as well because it shows the trend in terrorist attacks of more recent years and are probably more memorable.
Furthermore I analyzed all the variables in the database and decided which were most useful to visualize. There were initially 135 columns and after filtering this was reduced to 61 columns.
I converted the filtered dataset from csv to a json file. This json file is indexed on the unique event ID's.

An example of the format of my json file:<br>
{"eventid": {<br>
		*information about event like:*<br>
		year: 2003<br>
		country: iraq<br>
		kills: 100<br>
		motive: political<br>
		etc...<br>
	}}

Interesting variables to visualize in this dataset could be:
- the different target types (e.g. Business, Police, Government, Transportation, Military, Private Citizens & Property etc..) in a pie or donut chart
- the most used attack types (e.g. Armed Assault, Hostage taking, Bombing/Explosion, Assasination etc..) in a pie/donut chart or bar chart
- average succes rate of an attack per country per year in a line chart (linked with world map)
- amount of killed people in an attack per country per year in a line chart (linked with world map)
- group name behind the attack (e.g. FARC, Al-Qaida, Hezbollah, RIRA, ISI etc..) in a pie/donut chart
- amount of terrorist attacks per year in heat map (with slider for years)
- amount of terrorist attacks every day per country per year in a bar chart (so 365 bars)
- amount of terrorist attacks between 2000 and 2017 of several countries (select in check box) in multiple line chart

![Global Terrorism Diagram](https://github.com/kim66003/project/blob/master/doc/proposal/diagram.png)

In this diagram you can see that I will start with a csv file, which will be filtered and convert to a json file using pandas in python 3.7. Then this json file will be loaded into a javascript file where the data will be used to create a world heat map to show which countries have the most terrorist attacks. These will have a darker colour. The world map will have a year slider (2000 - 2017) to show the correct data per year on the map. On the top right corner of the page, there will be a dropdown menu to select one country. This will change all three charts to show the data for that country and for the selected year (with slider).
<br>When the user clicks on a country on the map or selects a country from the dropdown menu, a multiple line chart and donut chart will show up. The multiple line chart will show the trend in the number of kills and wounded from 2000 till 2017 for that country. I'm considering adding a dropdown menu here so more than one country can be selected to show the trend in kills and wounded to compare to each other (e.g. if France and Germany are selected, 4 lines will be shown).
<br>Furthermore the donut chart will show different categorial variables depending on what is selected in the dropdown menu. The standard donut chart will be showing the percentages of different terrorist groups that were behind the attacks per country (e.g. 50% FARC 30% RIRA 20% ISI). Other categorial variables that can be selected are: different target types (e.g. government, business, private citizens) and different attack types (e.g. armed assault, bombing).
<br>Finally the world map, multiple line chart and donut chart will be shown on the "visualisations" html page.

#### D3 plugins:
I will most likely use these plugins:
- Bootstrap
- jQuery
- TopoJSON
- d3 - tip
- d3 - legend
- and more to come...
