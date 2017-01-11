import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      question: '',
      score: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/quizzes')
    .then((response, error) => {
      console.log(response);
      this.setState({
        quizzes: response.data.quizzes
      })
    })
    .catch(error => console.error('ERROR with GET request', error))
  }

  render() {
    return (
      <div className="App">
        <h2>QUIZ TIME!!!</h2>
      </div>
    );
  }
}

export default App;
