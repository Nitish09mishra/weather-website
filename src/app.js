// requiring modules...
const path = require('path')
const express = require('express')
const forecast = require('./utilities/forecast')

// to load the app
const app = express()
const port = process.env.PORT || 3000  //this port is for heroku

// setting path to express config..
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

// setup handlebr and views location..
app.set('view engine', 'hbs')
app.set('views' , viewsPath)

// setting up static directory to server...
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'please enter city name.'
    })
    }

    forecast(req.query.search, (error, {city, min, max, weather, country} = {}) => {
        if(error){
            return res.send({error})
        }
        res.send({
            city: city + ', ' + country,
            temp_min: min,
            temp_max: max,
            weather: weather
        })
    })
})

app.get('*', (req, res) => {
    res.render('error')
})

// setarting server...
app.listen(port, () =>{
    console.log('server running on port ' + port)
})
