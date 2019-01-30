
# Global Terrorism
<i>By Kimberley Boersma
<br>
Github: kim66003</i>

<b>Link to project:</b>
[Global Terrorism Project](https://kim66003.github.io/project/ "Global Terrorism - Project")
### Purpose
This website contains a homepage, storypage, visualisations page and info page. The visualisations page has a worldmap (heatmap), linegraph (onclick) and donutchart (onclick) which shows information about terrorist attacks across the globe from 1990 through 2017.
It's purpose is to visualize the trend in terrorism over the years and how different aspects of these attacks changed like which terrorist group carried out most attacks or what weapon type was used most.

## Homepage
On the homepage there is a slideshow (bootstrap carousel) with some images about terrorism and of places where terrorism has taken place (Syria).
![alt text](https://github.com/kim66003/project/blob/master/doc/process/index_30-01-2019.png)

## Story page
The story page gives some information about terrorism and the reason behind making this website.
It states the problem that a lot of people lack knowledge about terrorism and that this website
provides more information on this subject in the form of visualisations.
![alt text](https://github.com/kim66003/project/blob/master/doc/process/story_30-01-2019.png)

## Visualisations page
This page contains 3 linked views: a worldmap, multiple linegraph and a donutchart.
![alt text](https://github.com/kim66003/project/blob/master/doc/process/visualisations_30-01-2019.png)
<b>Worldmap</b>:
- Can be updated by a timeslider to change the year
- Can be updated by clicking on circles in linegraph
- Has tooltip with more info on each country
- Has onclick function that updates linegraph and donutchart
- Text next to map explains how page works

<b>Multiple linegraph</b>
- Can be updated by clicking on country in worldmap
- Can be updated by choosing country in dropdown menu
- Lines have mouseover function
- Circles on lines have onclick function, this updates worldmap and donutchart for selected year
- Legend has mouseover function

<b>Donutchart</b>
- Has mouseover function
- Can be updated by timeslider
- Can be updated by clicking on circles in linegraph
- Can be updated by clicking on country in worldmap or dropdown
- Can be updated by choosing another category in dropdown

## Info page

This page has information about the dataset used and some contact information.
![alt text](https://github.com/kim66003/project/blob/master/doc/process/info_30-01-2019.png)
#### Dataset used:

[Kaggle Source](https://www.kaggle.com/START-UMD/gtd "Kaggle | Global Terrorism Database")

#### External components:

The /d3 folder contains d3 v5 code and some components from d3.
- [D3](https://d3js.org/d3.v5.min.js) Copyright 2019 Mike Bostock
- [Slider](https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518)  Copyright 2017-2018 John Walley
- [D3-tip](https://github.com/Caged/d3-tip/tree/master/examples) Copyright (c) 2013 Justin Palmer
- [D3-legend](http://bl.ocks.org/ZJONSSON/3918369) (C) 2012 ziggy.jonsson.nyc@gmail.com

<br>The /data folder contains Codebook.pdf which is from:
- [GTD](https://www.start.umd.edu/gtd/downloads/Codebook.pdf) ©UNIVERSITY OF MARYLAND

<br> The /data folder contains world_countries.json and world_attacks.tsv which is from:
-   [World Map v4](http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f)  Micah Stubbs

Plugins for python:
- Pandas
- Numpy

### Copyrights
Copyright &copy; 2019 Kimberley Boersma

## Sources

### Blocks
-   [World Map v4](http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f)  Micah Stubbs
-   [Slider](https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518)  Copyright 2017-2018 John Walley
### D3
-   [D3](https://d3js.org/d3.v5.min.js) Copyright 2019 Mike Bostock
-   [D3 Scale Chromatic](https://d3js.org/d3-scale-chromatic/) Copyright 2016 Mike Bostock
These d3 components are downloaded in my /d3 folder as mentioned under 'External Components':
-   [Slider](https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518)  Copyright 2017-2018 John Walley
-   [D3-tip](https://github.com/Caged/d3-tip/tree/master/examples) Copyright (c) 2013 Justin Palmer
-   [D3-legend](http://bl.ocks.org/ZJONSSON/3918369) (C) 2012 ziggy.jonsson.nyc@gmail.com

### Bootstrap
-   [Bootstrap](https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js)  Copyright 2011-2018 The Bootstrap Authors
-  [Bootstrap CSS](https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css)  Copyright (c) 2011-2018 Twitter, Inc./ Copyright 2011-2018 The Bootstrap Authors
-   [cloudflare](https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js)  Copyright (C) Federico Zivolo 2018
-   [jQuery](https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js)(c) JS Foundation and other contributors
-   [Bootstrap Navbar](https://www.w3schools.com/bootstrap4/bootstrap_navbar.asp)  Copyright 1999-2019 by Refsnes Data.
-   [Cards](https://www.w3schools.com/bootstrap4/bootstrap_cards.asp)  Copyright 1999-2019 by Refsnes Data.
-   [Carousel](https://www.w3schools.com/bootstrap4/bootstrap_carousel.asp)  Copyright 1999-2019 by Refsnes Data.
-   [Bootstrap footer](https://mdbootstrap.com/docs/jquery/navigation/footer/#purplepanel)  © 2019 Copyright: MDBootstrap.com
-   [Bootstrap jumbotron](https://getbootstrap.com/docs/4.0/components/jumbotron/) Copyright 2011-2018 The Bootstrap Authors

### Codepen
- [Donut chart](https://codepen.io/zakariachowdhury/pen/EZeGJy) ©2019 CodePen
- [Multiple linegraph](https://codepen.io/zakariachowdhury/pen/JEmjwq) ©2019 CodePen

### Images
- All favicons are from: [Iconfinder](https://www.iconfinder.com/search/?q=cat)
<br>Website images are from:
- [Ancient Aleppo](https://www.heraldnet.com/news/unesco-30-percent-of-aleppos-ancient-city-destroyed/)
- [Citadel Aleppo](https://sputniknews.com/middleeast/201706211054855058-aleppo-citadel-carnival/)
- [Desert](http://wallpapers.ae/sahara-desert-sunset-picture.html/sahara-desert-sunset-picture)
- [GTD logo](http://www.habilian.ir/en/201602292492/documents/mko-on-the-global-terrorism-database-sp-103888886.html)
- [Lake canada](https://airfreshener.club/quotes/canoe-desktop-backgrounds.html)
- [Sharokh Heidari](https://www.cartoonmovement.com/collection/96) VJ Movement © 2010
- [Eiffel tower](https://www.pinterest.ca/pin/471541023465133829/)
<br>Proposal images:
- [Proposal linegraph](https://www.economist.com/graphic-detail/2015/11/18/the-plague-of-global-terrorism)
- [Proposal barchart](http://www.newsmov.biz/afghanistan-religion-pie-chart.html)
- [Proposal linegraph2](https://www.cs.unm.edu/~aaron/blog/archives/political_wonk/index.htm)

### Other
-   [Topojson](https://github.com/topojson/topojson-client)  Copyright 2016 Mike Bostock
-   [Stack Overflow](https://stackoverflow.com/)

Disclaimer:
I did not upload the original dataset to my /data folder because it was too big to upload (155MB),
however I processed all the data into smaller .json files which I use for my website. If you wish to test my process.py
script, plug in this dataset so it has the path: "../data/globalterrorismdb_0718dist.csv" with this exact title.
The dataset is a .zip file so you will have to unzip it first and then place the file with name "globalterrorismdb_0718dist.csv"
in the "data" folder. Then instal numpy and pandas and python 3.7. Then open this path in your console: ../project/scripts and run
the command "python process.py"
