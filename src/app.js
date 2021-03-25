const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: "Know about krishna",
        name: "Krishna"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Know about krishna",
        name: "Krishna"
    })   
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: "Provide an address plz"
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        res.send({
            forecast: "good!",
            latitude,
            longitude,
            location
        })
        // forecast(latitude, longitude, (error, forecastData) =>{
        //     if (error) {
        //         return res.send({ error })
        //     }            
            
        //     res.send({
        //         forecast: forecastData, 
        //         location,
        //         address: req.query.address
        //     })
        // })
    })

    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Know about krishna",
        name: "Krishna"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error_msg: "Help page not found!",
        title: "Know about krishna",
        name: "Krishna"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        error_msg: "page not found!",
        title: "Know about krishna",
        name: "Krishna"
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})
