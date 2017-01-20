import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      answers: []
    }
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  handleAnswers(event) {
    let answers = this.state.answers

    if (answers.some((answer)=> answer.score == event.target.id)) {
      let index = answers.findIndex((answer)=> answer.score == event.target.id)
      answers[index] = {score: parseInt(event.target.id), title: event.target.value}
      this.setState({answers: answers})
    } else {
      let answer = {score: parseInt(event.target.id), title: event.target.value}
      answers.push(answer)
      this.setState({answers: answers})
    }
  }

  handleSubmit(){
    axios.post(`http://localhost:3001/quizzes/1/questions`, {
      'title': this.state.title,
      'answers': this.state.answers
    }).then((response)=> {console.log(response)})
    .catch((error)=> {console.error(error)});
    this.props.submitForm();
  }

  render(){
    return(
      <div>

        <form onSubmit={()=>this.handleSubmit()}>
          <h2>Submit a new question!</h2>

          <label> Title: </label>
          <input id='title' onChange={(event)=>this.handleTitle(event)}></input>

          <br></br>
          <label> Questions (score 0-3): </label>
          <input id='0' onChange={(event)=>this.handleAnswers(event)} className='question'></input>
          <input id='1' onChange={(event)=>this.handleAnswers(event)} className='question'></input>
          <input id='2' onChange={(event)=>this.handleAnswers(event)} className='question'></input>
          <input id='3' onChange={(event)=>this.handleAnswers(event)} className='question'></input>

          <br></br>
          <input id='submit' type='submit' value='Submit'/>
          <br></br>
        </form>

      </div>
    )
  }
}

module.exports = Form
