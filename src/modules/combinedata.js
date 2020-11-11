//Function to combine different datasets based on areaid that exists in both datasets, thanks Rijk :) //
const combineDataSets = (specifications, geolocations) => {
  //Find the areaid in both datasets
  const result = specifications.map((specification) => {
    const geolocation = geolocations.find(
      (geolocation) => specification.areaid === geolocation.areaid
    );

    //put corresponding data in a new key called location
    specification.location = geolocation;
    return specification;
  });

  //remove all entries that had no match
  const locationFilter = result.filter((data) => data.location !== undefined);

  //Cut down dataset to only the rows I need
  const newDataset = locationFilter.map(data => ({
    name: data.location.areadesc,
    id: data.areaid,
    capacity: parseInt(data.capacity),
    chargingpoints: parseInt(data.chargingpointcapacity),
    coordinates: data.location.location
  }))

  return newDataset;
};

export default combineDataSets;


