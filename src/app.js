const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Natália L.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Natália L.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Natália L.',
        message: 'This is a help page.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'You must provide an address!'})
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forcastData) => {
            //forecast(10000000000, 10000000000, (error, data) => {
            if(error){
                return res.send({error})
            }

            res.send({
                address: req.query.address,
                forcast: forcastData,
                location
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
        console.log(req.query.search)
        res.send({
            products: []
        })
   
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Natália L.',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Natália L.',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})