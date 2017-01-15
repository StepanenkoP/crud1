import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GameSchema = new Schema({
  title: { type: String },
  cover: { type: String }
})

const Note = mongoose.model('Game', GameSchema)
