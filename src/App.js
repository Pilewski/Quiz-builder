import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      quizzes: [],
      score: [],
      submit: ''
    }
  }

  handleSubmit() {

  }

  componentDidMount() {
    axios.get('http://localhost:3001/quizzes')
    .then((response, error) => {
      this.setState({
        quizzes: response.data.quizzes
      })
    })
    .catch(error => console.error('ERROR with GET request', error))
  }

  render() {
    const { quizzes, submit } = this.state

    let title = quizzes.map((q) => {
      return (
        <h1 key='title'>{q.title}</h1>
      )
    })

    let questions = quizzes.map(quiz => {
       return quiz.questions.map((question, index) => {
        return question.answers.map((answer, index) => {
          if(question.answers.indexOf(answer) === 0) {
            return (
              <div className='question'>
                <h4>{question.title}</h4>
                <input
                  name={question.title}
                  type="radio" />
                {answer.title}
              </div>
            )
          }
          return (
            <div className='answer'>
              <input
                name={question.title}
                type="radio" />
              {answer.title}
            </div>
          )
        })
      })
    })

    return (
      <div className="App">
        {title}
        <section>
          <div className='score'>
            {this.state.submit}
          </div>
          {questions}
          <button
            onClick={()=>this.handleSubmit()}>
            SUBMIT
          </button>
        </section>
      </div>
    );
  }
}

export default App;
