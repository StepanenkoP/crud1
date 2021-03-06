import React, { PropTypes } from 'react'
import classnames from 'classnames'
import update from 'react-addons-update'
import {connect} from 'react-redux'
import {saveGame} from '../../AC/games'

class GamesForm extends React.Component {
  state = {
    title: '',
    cover: '',
    errors: {},
    loading: false
  }

  onChangeHandler = (e) => {
    const newErrors = update(this.state.errors, {[e.target.name]: {$set: ''}})
    this.setState({
      [e.target.name]: e.target.value,
      errors: newErrors
    })
  }

  //validation
  handleSubmit = (e) => {
    e.preventDefault()

    let errors = {}
    if (this.state.title === '') errors.title = "Can't be empty"
    if (this.state.cover === '') errors.cover = "Can't be empty"
    this.setState({errors})
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const {title, cover} = this.state
      this.setState({loading: true})
      this.props.saveGame({title, cover}).then(
        (res) => {console.log(res)},
        (err) => {
          this.setState({ errors: err.response.data.errors , loading: false})
        }
      )
    }
  }

  render () {
    return(
      <form className={classnames("ui form", {
          loading: this.state.loading
        })} onSubmit={this.handleSubmit}>
        <h1>Add new game</h1>

      {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', {
            error: !!this.state.errors.title
          })}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={this.onChangeHandler}
            value={this.state.title}
          />
        <span>{this.state.errors.title}</span>
        </div>

        <div className={classnames('field', {
            error: !!this.state.errors.cover
          })}>
          <label htmlFor="cover">Cover URL</label>
          <input
            type="text"
            id="cover"
            name="cover"
            onChange={this.onChangeHandler}
            value={this.state.cover}
          />
        <span>{this.state.errors.cover}</span>
        </div>

        <div className="field">
          {this.state.cover !== '' && <img src={this.state.cover} alt="cover" className="ui small bordered image"/>}
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>

      </form>
    )
  }
}

export default connect(null, {saveGame})(GamesForm);
