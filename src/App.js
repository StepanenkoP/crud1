import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Match} from 'react-router'
import GamesPage from './components/games/GamesPage'
import GamesForm from './components/games/GamesForm'

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <Link className="item" activeClassName="active" activeOnlyWhenExact to="/">Home</Link>
          <Link className="item" activeClassName="active" activeOnlyWhenExact to="/games">Home</Link>
          <Link className="item" activeClassName="active" activeOnlyWhenExact to="/games/new">Add new game</Link>
        </div>

        <Match exactly pattern="/games" component={GamesPage} />
        <Match pattern="/games/new" component={GamesForm} />
      </div>
    );
  }
}

export default App;
