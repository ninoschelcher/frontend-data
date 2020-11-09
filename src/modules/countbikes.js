const countBikes = (data) => {
   const bikes = data.map(data => {
     const newBikes = data.capacity * 6;
     return newBikes;
   })

  return bikes;
}

export default countBikes;