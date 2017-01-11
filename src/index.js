import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// let scores = this.state.score.map((score)=> score[1])
// let sum = scores.reduce((sum, i)=> sum + parseInt(i), 0)
// axios.post('http://localhost:3001/scores', {
//   "score": sum
// })
// .then((response, error)=>
//   this.setState({
//     submit: response.data.score
//   })
// )
// .catch(error => console.error('ERROR with POST request', error))


// let name = location.target.name
// let score = location.target.className
// let array = this.state.score
//
// if (this.state.score.some((score)=> name === score[0])){
//   array = this.state.score.filter((score)=>  name !== score[0])
//   array.push([name, score])
// } else {
//   array.push([name, score])
// }
// this.setState({score: array})
