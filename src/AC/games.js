import {SET_GAMES} from '../types'
import axios from 'axios'

function handleResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    let error = new Error(res.statusText)
    error.response = res
    throw error
  }
}

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  }
}

export function fetchGames() {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => {
        dispatch(setGames(data))
      })
  }
}

export function saveGame(data) {
  return dispatch => {
    return axios({
      method: "post",
      url: "/api/games",
      data: data,
       headers: {
          'Content-Type': 'application/json'
      }
    })
      .then(handleResponse)
  }
}
