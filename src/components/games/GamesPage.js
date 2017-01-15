import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import GamesList from './GamesList'
import {fetchGames} from '../../AC/games'

class GamesPage extends React.Component {
  componentDidMount() {
    this.props.fetchGames()
  }

  render () {
    return (
      <div>
        <h1>Games List</h1>
        <GamesList games={this.props.games} />
      </div>
    )
  }
}

GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired
}

function mapStateToProps({games}) {
  return {
    games
  }
}

export default connect(mapStateToProps, {fetchGames})(GamesPage);
