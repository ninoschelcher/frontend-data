//Het voorbeeld van Rijk gebruikkt om de 2 datasets te combineren.
const combineDataSets = (specifications, geolocations) => {
  const result = specifications.map((specification) => {
    const geolocation = geolocations.find(
      (geolocation) => specification.areaid === geolocation.areaid
    );

    specification.areaidlocation = geolocation;
    return specification;
  });

  const filter = result.filter((data) => data.areaidlocation !== undefined);
  return filter;
};

export default combineDataSets;


//  return data.areaidlocation.areadesc.replace("(Amsterdam)", "");
