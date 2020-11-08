const getParkingAmsterdamLocations = (data, row2, city) => {
    return data.filter(data => data[row2].startsWith(city));
}

export default getParkingAmsterdamLocations;