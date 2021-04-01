require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const MongoClient = require('mongodb')
//const connectionString = require('./secrets.js')



MongoClient.connect(process.env.DB_CONNECT, { useUnifiedTopology: true })
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
        itemCollection.insertOne({item: req.body.item, done: false} )
          .then(result => {
            console.log(req.body.item)
            console.log('redirect')
            res.redirect('/')
          })
         .catch(error => console.error(error))
      })

    .delete('/deleteItem', (req, res) => {
      itemCollection.deleteOne({item: req.body.item})
      .then(result => {
          console.log('Item Deleted')
          res.json('Item Deleted')
      })
      .catch(error => console.error(error))
    })

    .put('/updateItem', (req, res) => {
      itemCollection.findOneAndUpdate({item: req.body.item},
        {
          $set: {
            item: req.body.update
          }
        },
        {
          upsert: true
        })
        .then(result => {
          console.log('Item Updated')
          res.json('Item Updated')
        })
        .catch(err => console.log(err))
    })

    .put('/checkBox', (req, res) => {
      itemCollection.findOneAndUpdate({item: req.body.item},
        {
          $set: {
            done: req.body.done
          }
        },
        {
          upsert: true
        })
        .then(result => {
          console.log('Item Done')
          res.json('Item Done')
        })
        .catch(err => console.log(err))
    })

    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  })