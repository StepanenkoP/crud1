import express from 'express'
import mongodb from 'mongodb'
import * as db from './utils/DataBaseUtils'
import bodyParser from 'body-parser'
import {validateGameData} from './utils/validateGameData'

const app = express()

app.use(bodyParser.json())

db.setUpConnection()

// db.createGame({
//   title: 'LoL'
// })

app.get('/api/games', function(req,res) {
  db.listGames().then(data => res.send(data))
})

app.post('/api/games', function(req,res) {
  const {errors, isValid} = validateGameData(req.body)
  if (isValid) {
    console.log(req.body);
    const {title, cover} = req.body
    db.createGame({title, cover}).then(res.status(200).json({success: true}))
  } else {
    res.status(400).json({errors})
  }
})

app.use((req,res) => {
  res.status(404).json({
    errors: {
      global: "Still working on it. Please try again later"
    }
  })
})



// const dbUrl = 'mongodb://test:test@ds111479.mlab.com:11479/crudspa'

// mongodb.MongoClient.connect(dbUrl, function(err, db) {
//
//   app.get('/api/games', (req,res) => {
//     db.collection('games').find({}).toArray((err,games) => {
//       res.json({games})
//     })
//   })
//
// })

app.listen(8080, () => console.log('Server is running on 8080 port'))
