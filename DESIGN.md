## Design project: Global Terrorism
#### Data source and processing
For this project I will use the Global Terrorism Database from kaggle.com. 
Link to datasource: [Global Terrorism Database](https://www.kaggle.com/START-UMD/gtd "Global Terrorism Database | Kaggle")

This is a database with records of terrorist attacks within the period 1970 - 2017 in a csv file. The initial database was very large, too large to upload to github, and so I decided to filter the data for the years 2000 - 2017. This data probably is more relevant to the user as well because it shows the trend in terrorist attacks of more recent years and are probably more memorable.
Furthermore I analyzed all the variables in the database and decided which were most useful to visualize. There were initially 135 columns and after filtering this was reduced to 61 columns.
I converted the filtered dataset from csv to a json file. This json file is indexed on the unique event ID's. 

An example of the format of my json file:
{"eventid": {
		*information about event like:*
		year: 2003
		country: iraq
		kills: 100
		motive: political
		etc...
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
    
#### D3 plugins:
I will most likely use these plugins:
- Bootstrap
- jQuery
- d3 - tip
- d3 - legend
- and more to come...
