//Function to combine different datasets based on areaid that exists in both datasets, thanks Rijk :) //
const combineDataSets = (specifications, geolocations) => {
  const result = specifications.map((specification) => {
    const geolocation = geolocations.find(
      (geolocation) => specification.areaid === geolocation.areaid
    );

    specification.location = geolocation;
    return specification;
  });

  const locationFilter = result.filter((data) => data.location !== undefined);

  const newDataset = locationFilter.map(data => ({
    name: data.location.areadesc,
    id: data.areaid,
    capacity: data.capacity,
    chargingpoints: data.chargingpointcapacity,
    coordinates: data.location.location
  }))

  return newDataset;
};

export default combineDataSets;


