const getData= new Promise((resolve, reject) => {
    // resolve(55555);
    reject('No available data to show')
})

getData
    .then( data => console.log( data / 2 + .5))
    .catch(err=> console.error("Error", err))