import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{
  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => {
        this.setState({
          toys
        });
      });
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = toy => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept:  'application/json'
      },
      body: JSON.stringify({
        ...toy, likes: 0
      })
    })
      .then(response => response.json())
      .then(newToy => this.setState(prevState => {
        const newState = {...prevState};
        newState.toys.push(newToy); 
        return newState;
      }));
  }

  addLikeToToy = toy => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept:  'application/json'
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
      .then(response => response.json())
      .then(updatedToy => {
        this.setState(prevState => {
          const newState = {...prevState};
          const index = newState.toys.findIndex(toy => toy.id === updatedToy.id);
          newState.toys[index] = updatedToy;
          return newState;
        });
      });
  }

  deleteToy = toy => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        this.setState(prevState => {
          return {...prevState, toys: prevState.toys.filter(t => t.id !== toy.id)};
        })
      });
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display ? <ToyForm onSubmit={this.addToy}/> : null }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} addLike={this.addLikeToToy} deleteToy={this.deleteToy} />
      </>
    );
  }

}

export default App;