const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=449d72d24a710bc15e186abba1302177&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find coordinates', undefined)
        } else {
            //console.log('Coordinates: ' + data.body.features[0].geometry.coordinates[0] + ', ' + data.body.features[0].geometry.coordinates[1])
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out")
        }
    })
}

module.exports = forecast