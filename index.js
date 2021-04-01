const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const MongoClient = require('mongodb')
const connectionString = require('./secrets.js')


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('to-do')
    const itemCollection = db.collection('items')
    express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    // Routes
    .get('/', (req, res) => {
      itemCollection.find().toArray().then(data => {
        res.render('pages/index', {info: data})
      })
    })
    .post('/items', (req, res) => {
        console.log('post request')
        itemCollection.insertOne(req.body)
          .then(result => {
            console.log(req.body.item)
            console.log('redirect')
            res.redirect('/')
          })
         .catch(error => console.error(error))
      })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  })