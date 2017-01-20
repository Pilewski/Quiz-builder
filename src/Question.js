import React, { Component } from 'react';

class Question extends Component {
  render(){
    return(
      <div className='question'>
        <h4>{this.props.questiontitle}</h4>
        <input
          onClick={()=>this.props.radioClick(this.props.id, this.props.score)}
          name={this.props.id}
          type="radio" />
        {this.props.answertitle}
      </div>
    )
  }
}

module.exports = Question
