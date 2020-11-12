# Frontend-data
This repository contains my process of creating a interactive visualization for The Volkskrant. Full documentation & process can be found [in my wiki](https://github.com/ninoschelcher/frontend-data/wiki).

# The Assignment 📝
During this project we're working together with The Volkskrant, a newspaper based in the Netherlands. We have to come up with a concept related to: **The car in the city**.

Now the goal is to find interesting insights in these (37) datasets about parking and turn these into interesting research questions that we can answer with a datavisualization created with D3. The Volkskrant can decide if they think these visualization(s) are enough to write an article about.

![Volkskrant picture](https://github.com/ninoschelcher/functional-programming/blob/main/wiki_media/798px-Volkskrant.svg.png)

Volkskrant, 2020

# Research Question(s) 🔍

Bikes in Amsterdam came up in my head during my brainstorm, there are a lot of them in Amsterdam. Why wouldn't it be interesting to know how many bikes could fit into the space that parking garages have right now? So I came up with the following research question.

## How many bikes could fit in all parking spots in Amsterdam parking garages? 

I've also written down some sub questions that are required to answer this question

###  1. Where are the parking garages in Amsterdam?
- **Datasets:**
   - [Specificatie Parkeergebied](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s/) — Information about parking garages with specifications like Capacity, Charging Points and Disabled Access.
   - [GEO Parkeer Garages](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34/data) — Geographical data about the specific parking garages.

- **Variables:**
   - **AreaDesc** — Description/name of parking garage (text)
   - **Location** — Data that consists of Latitude and Longitude (number)
   - **AreaId** — Number to identify specific garage, can be combined to find geo location of garage with charging point (number/text)

### 2. What is the capacity of each parking garage?
- **Datasets:**
  - [Specificatie Parkeergebied](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s/) — Information about parking garages with specifications like Capacity, Charging Points and Disabled Access.
  - [GEO Parkeer Garages](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34/data) — Geographical data about the specific parking garages.

- **Variables:**
  - **Capacity** — Amount of charging points in a garage (number)
  - **Location** — Data that consists of Latitude and Longitude (number)
  - **AreaId** — Number to identify specific garage, can be combined to find geo location of garage with charging point (number/text)

I'm gonna combine these 2 datasets, there will probably be some entries that dont exist in both datasets which means that they won't be taken into the final visualization. This process is better described [on this page](https://github.com/ninoschelcher/frontend-data/wiki/RDW-data)

### Questions I need to answer without the datasets
- **How big is the average car parking spot?** — Required to calculate/visualize how many bikes could fit in a parking spot.
- **How long and wide is the average bicycle?** — Required to calculate how bikes could fit in a parking spot, I will probably take a regular city bike for this.

### External Datasets?
- [Amsterdam parking spaces](https://map.data.amsterdam.nl/maps/parkeervakken?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=alle_parkeervakken&outputformat=geojson) — This might come in handy if I wanted to use the parking spaces on the street instead of a parking garage because its more relevant to the cyclists who want to park their bike close to home.

Full documentation about my research questions and explanations are [in my wiki](https://github.com/ninoschelcher/frontend-data/wiki/Concept-Iteration)

So for my concept I will make a data story where I go through and explain step by step how many bikes could fit into the parking garages in Amsterdam.

# Concept 🌝
The live page can be viewed [on this page](https://ninoschelcher.github.io/frontend-data/src/index.html)

The goal for a visualization for Frontend Data was to show the amount of garages and capacity within them. I've done this through a circular bar plot visualization, every bar is a garage. Interaction is done through input fields such as checkboxes and input fields that updates the chart. This interaction also updates the texts under the visualization that shows the amount of capacity for cars and how much bikes would probably fit in these garages.

I also wanted to update the map I've put under the circular bar plot based on interaction from the first chart but I couldn't really figure that out in the time I had still left.

### Example for my concept
I've based my final visualization on [this example from d3 gallery](https://www.d3-graph-gallery.com/graph/circular_barplot_basic.html) because this gave me a good start to building a visualization. The things I've added is stuff like interactions and transitions to make it my own.

![concept screenshot](https://github.com/ninoschelcher/frontend-data/blob/main/wiki_media/conceptscreenshot.png)

The final result is a bit different from what I intended to, the 4 sketches I made in [concept iteration](https://github.com/ninoschelcher/frontend-data/wiki/Concept-Iteration) are probably gonna be feasible in the next 2 weeks where I have more time to work on the visualization and turn it into a data story with multiple charts.

![concept sketch](https://github.com/ninoschelcher/frontend-data/blob/main/wiki_media/capacity.png)

# Interesting Functional Pattern 💡 
The most interesting functional pattern is the `formatAnswers()` function. In this function I format all answers into a hex code so it's consistent to use. Some answers needed a # and others were written out like `Blauw` or `Rood`. The functional pattern can be found [here](https://github.com/ninoschelcher/functional-programming/blob/8406b341de0dbf77022d8b12798f4415e8bf4be1/src/surveyexercise/surveyCleanup.js#L17)

# Sources & Acknowledgements 🙋
- [Laurens](https://github.com/Razpudding) — For [this](https://github.com/ninoschelcher/functional-programming/blob/5f093897016b1c53d41cc6bf522d4afe2c28a3d6/parkingData.js#L9) function to fetch data. 
- [Max Hauser](https://github.com/max-hauser) — For regular feedback throughout the project.
- [Volkskrant Image](https://nl.wikipedia.org/wiki/De_Volkskrant) — Wikipedia-bijdragers. (2020b, 7 oktober). De Volkskrant. Geraadpleegd op 30 oktober 2020, van https://nl.wikipedia.org/wiki/De_Volkskrant
