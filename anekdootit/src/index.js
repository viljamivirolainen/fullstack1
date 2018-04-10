import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  nextAnecdote = () => {
    const selectable = anecdotes.filter((x) => x !== anecdotes[this.state.selected])
    const randomAnecdote = () => Math.floor(Math.random() * selectable.length)  
    return this.setState({selected: randomAnecdote()})
  }

  maxAnecdoteIndex = () => {
    const index = this.state.votes.reduce((indexOfMax, e, i, array) => e > array[indexOfMax] ? i : indexOfMax, 0)
    return index
  }

  vote = (index) => {
    const newVotes = this.state.votes
    newVotes[index] = newVotes[index] + 1
    this.setState({votes: newVotes})
  }

  render() {
    return (
      <div>
        <Statistics anecdote = {anecdotes[this.state.selected]} votes = {this.state.votes[this.state.selected]} />
        <Button handleClick = {() => this.vote(this.state.selected)} text = 'vote' />
        <Button handleClick = {this.nextAnecdote} text = 'next andecdote' />
        <Header text = 'anecdote with most votes:' />
        <Statistics anecdote ={anecdotes[this.maxAnecdoteIndex]} votes = {this.state.votes[this.maxAnecdoteIndex()]} />
      </div>
    )
  }
}


  
const Statistics = ({anecdote,votes}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>)
}
 
const Header = ({text}) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (<div><button onClick={handleClick}>
    {text}
  </button></div>)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

