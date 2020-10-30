# Functional Programming 👓
This repository contains my process of cleaning data with functional patterns and process of finding good research questions from the dataset with a matching concept for The Volkskrant. Full documentation & process can be found [in my wiki](https://github.com/ninoschelcher/functional-programming/wiki)

# The Assignment 📝
During this project we're working together with The Volkskrant, a newspaper based in the Netherlands. Together with the The Datalab department at the Volkskrant we have to come up with a concept related to: **The car in the city**.

Now the goal is to find interesting insights in these (37) datasets about parking and turn these into interesting research questions that we can answer with a datavisualization. The Volkskrant can decide if they think these visualization(s) are enough to write an article about.

# Research Question(s) 🔍
After brainstorming and looking at all the datasets I thought that electric cars was an interesting topic, it's upcoming + a relevent topic since electric cars are 'better' for the environment. So I came up with the following research question:
- Is Amsterdam a good city for an electric car?

## Other Research Questions
### 1. How many charging points are available per parking garage in Amsterdam?
- **Assumption:** I think that there is a big difference, some garages have a lot while other ones have 1/2 or maybe none. Outside of the centre are probably the ones with more charging points.

- **Dataset:**
   * [Specificatie Parkeergebied](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) — Information about parking garages with specifications like Capacity, Charging Points and Disabled Access. 
   * [GEO Parkeer Garages](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34) — Geographical data about the specific parking garages.

- **Variables:**
   * **ChargingPointCapacity** – Amount of charging points in a garage (number)
   * **Location** — Data that consists of Latitude and Longitude (number)
   * **AreaId** — Number to identify specific garage, can be combined to find geo location of garage with charging point (number/text)

### 2. In which district in Amsterdam is it the easiest/hardest to find a charging point for you car?
- **Assumption:** This is a tricky one, I have a mixed feelings about it. It's probably harder to find a parking spot in the centre cause more people are working in the centre of Amsterdam but there are a lot of charging spots. But meanwhile in other districts, for example Nieuw-West there are not a lot of charging spots while there are more people buying an electric car. 
 
- **Dataset:**
    * [Specificatie Parkeergebied](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) — Information about parking garages with specifications like Capacity, Charging Points and Disabled Access. 
    * [GEO Parkeer Garages](https://opendata.rdw.nl/Parkeren/GEO-Parkeer-Garages/t5pc-eb34) — Geographical data about the specific parking garages.

- **Variables:**
    * **ChargingPointCapacity** – Amount of charging points in a garage (number)
    * **Location** — Data that consists of Latitude and Longitude (number)
    * **AreaId** — Number to identify specific garage, can be combined to find geo location of garage with charging point (number/text)

### 3. Is a parking garage in Amsterdam that has charging points more expensive than one without charging points?
- **Assumption:** This could be an interesting one, I don't think there is gonna be a big difference. Since there aren't a lot of charging points anyways it wouldn't influence the price.

- **Dataset:**
    * [Specificatie Parkeergebied](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) — Information about parking garages with specifications like Capacity, Charging Points and Disabled Access. 
    * [Tariefdeel](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-TARIEFDEEL/534e-5vdg) — Data about the fares of different parking spaces and the dates it started.

- **Variables:**
    * **ChargingPointCapacity** – Amount of charging points in a garage (number)
    * **AreaManagerId** — Identification code for area administrator (number)
    * **FareCalculationDesc** — Describes how much the fare is of a parking spot (number/text)

### 4.  Are parking garages in Amsterdam with charging points convenient for people who charge their car during work times?
- **Assumption:** I think parking garage owners have in mind that they should have their garage open all day long, this makes it easier for people with an electric car to park it there. So I think the garages that are for example open from 06:00-24:00 have charging points available for people to charge their cars during the day.

- **Dataset:**
    * [Specificatie Parkeergebied](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) — Information about parking garages with specifications like Capacity, Charging Points and Disabled Access. 
   * [Tijdvak](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-TIJDVAK/ixf8-gtwq/data) — Information about opening and closing times of a parking garage.

- **Variables:**
    * **ChargingPointCapacity** – Amount of charging points in a garage (number)
    * **AreaId** — Number to identify specific garage, can be combined to find geo location of garage with charging point (number/text)
    * **StartTimeTimeFrame** — Specific time the parking space opens. (number)
    * **EndTimeTimeFrame** — Specific time the parking space closes. (number)

Full documentation about my research questions and explanations are [in my wiki](https://github.com/ninoschelcher/functional-programming/wiki/Brainstorming-&-Research-Questions)

# Installation Guide 💻
There are a few steps required to do so you can get the program up and running on your own machine!

### Clone project
- Clone this repo to your local machine using `$ git clone https://github.com/ninoschelcher/functional-programming.git`
- Go to the directory by typing `$ cd functional-programming`

### Install packages
- Install all required packages by using `$ npm install`

### Run project
- type `$ npm run test` to start the program

# Sources & Acknowledgements 🙋
- [Laurens](https://github.com/Razpudding) — For [this](https://github.com/ninoschelcher/functional-programming/blob/5f093897016b1c53d41cc6bf522d4afe2c28a3d6/parkingData.js#L9) function to fetch data. 
- [Stackoverflow Multiple Map Values](https://stackoverflow.com/a/41762582) — Used for [this part](https://github.com/ninoschelcher/functional-programming/blob/704b5c0cb8ae9a7c460b3895c497d0516c944126/parkingData.js#L43) of my code.
