# Dataprocessing project: Global Terrorism
A webpage that visualizes trends of terrorist attacks from the last 20 years. Information can be specified per country and/or per year.

											By Kimberley Boersma
#### Problem statement:
There is a big database available that contains information about worldwide terrorist attacks from the period 2000-2017. This database is currently still being maintained for the Study of Terrorism and Responses to Terrorism (START), headquartered at the University of Maryland.

Since terrorism has been in the news a lot the past couple of years, there is a lot more interest around this topic. People might feel like the amount of terrorist attacks has increased over time because of the media awareness. It would be interesting to visualize the trend in terrorist attacks of the last decades and see if the attack rates have indeed increased. Furthermore, there might also be trends in *attack types*, *target types*, *location*, *terrorist group* that could lead to informative visualizations.

The target audience for this data visualization is: people from all age groups that have an interest in how global terrorism has changed over time and people who might want to use this data analysis to prevent and reduce terrorism.

Definition of terrorism
>"The threatened or actual use of illegal force and violence by a non-state actor to attain a political, economic, religious, or social goal through fear, coercion, or intimidation."

<br/>

#### Solution:
The project will consist of a website with an interactive heat map of the world on the frontpage. Countries with higher attack rates per year will have a darker colour. The website will also include two other interactive plots like a line graph and a donut chart to provide statistical information on terrorist attacks.

**Main features**
Minimum viable product:
* Interactive worldmap
* Multiple line graph
* Donut chart
* Dropdown menu (countries)
* Slider (years)
* Dropdown check menu (choose categorial variable)

Optional:
* Redirect to page with a *list* of terrorist attacks when user chooses specific country or year
* Show short *description* of terrorist attack when user clicks on attack name in this list
* Provide link to original newsreport under these *descriptions*
* Bar chart/histogram

![alt text](https://github.com/kim66003/project/blob/master/doc/readme/worldmap.png)

#### Prerequisites:
Data source(s):
* [Global Terrorism Database](https://www.kaggle.com/START-UMD/gtd "Global Terrorism Database | Kaggle")

External components (up until now):
* D3
* Javascript
* Pandas
* JSON
* CSV

Hardest parts:
* Interactive world map
* Redirecting to new page when clicking on visualization
* Show the correct data when user chooses country and/or year

https://kim66003.github.io/project/
