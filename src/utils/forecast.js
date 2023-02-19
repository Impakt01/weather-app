const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=97c6f2198cdc25cad81451b9c28f93d5&query=' + latitude + "," + longitude + '&units=f'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            const temp = Math.round((body.current.temperature  - 32)/1.8)
            const feelslike = Math.round((body.current.feelslike - 32)/1.8)
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + temp + ' degrees celsius but it feels like ' + feelslike + ' degree celsius out.')

        }

    })
}

module.exports = forecast