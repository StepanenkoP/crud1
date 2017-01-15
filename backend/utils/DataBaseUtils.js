import mongoose from 'mongoose'
import '../models/Game'

const Game = mongoose.model('Game')

export function setUpConnection() {
  mongoose.connect(`mongodb://test:test@ds111479.mlab.com:11479/crudspa`)
}

export function listGames() {
  return Game.find({})
}

export function createGame(data) {
  const game = new Game({
    title: data.title,
    cover: data.cover
  })

  return game.save()
}
