import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Question from './Question'
import Form from './Form'

class App extends Component {
  constructor() {
    super()
    this.state = {
      quizzes: [],
      score: {},
      submit: '',
      clear: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/quizzes')
    .then((response) => {
      this.setState({
        quizzes: response.data.quizzes
      })
    })
    .catch(error => console.error('ERROR with GET request', error))
  }

  submitForm() {
    this.setState({add: false})
  }

  handleSubmit() {
    let scores = Object.values(this.state.score)
    let sum = scores.reduce((sum, i) => sum + i, 0)

    axios.post('http://localhost:3001/scores', {
      'score': sum
    })
    .then((response)=> {
      this.setState({'submit': response.data.score})
    })
    .catch((err)=> console.error(err))
  }

  handleChange(question, score) {
    this.setState({clear: null})

    let obj = this.state.score
    obj[question] = score

    this.setState({score: obj})
  }

  handleDelete(){
    let length = this.state.quizzes[0].questions.length - 1
    const latestID = this.state.quizzes[0].questions[length].id

    axios.delete(`http://localhost:3001/quizzes/1/questions/${latestID}`)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  clearScore(){
    this.setState({score: {}, clear: false})
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
              <Question questiontitle={question.title}
                answertitle={answer.title}
                score={answer.score}
                id={question.id}
                clear={this.state.clear}
                radioClick={()=>this.handleChange(question, answer)}
              />
            )
          }
          return (
            <div className='answer'>
              <input
                checked={this.state.clear}
                onClick={()=>this.handleChange(question.id, answer.score)}
                name={question.id}
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
            {submit}
          </div>
          {questions}
          <button
            disabled={questions.length==this.state.score}
            onClick={()=>this.handleSubmit()}>
            SUBMIT
          </button>
          <button
            onClick={()=>this.setState({'add':true})}>
            ADD QUESTION
          </button>
          <button
            onClick={()=>this.handleDelete()}>
            DELETE QUESTION
          </button>
          <button
            onClick={()=>this.clearScore()}>
            CLEAR
          </button>
        </section>

        {this.state.add ? <Form submitForm={this.submitForm}/> : ''}
      </div>
    );
  }
}

export default App;
