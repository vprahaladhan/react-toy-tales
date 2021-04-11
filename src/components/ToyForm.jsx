import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    name: '',
    image: ''
  }

  handleInput = ({ target }) => {
    this.setState({
      [`${target.name}`]: target.value
    })
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      image: '' 
    });
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.onSubmit}>
          <h3>Create a toy!</h3>
          <input 
            type="text" 
            name="name" 
            className="input-text"
            placeholder="Enter a toy's name..."
            value={this.state.name} 
            onChange={this.handleInput} />
          <br/>
          <input 
            type="text" 
            name="image"
            className="input-text"
            placeholder="Enter a toy's image URL..."
            value={this.state.image} 
            onChange={this.handleInput} />
          <br/>
          <input 
            type="submit" 
            name="submit" 
            value="Create New Toy" 
            className="submit"/>
        </form>
      </div>
    );
  }
}

export default ToyForm;