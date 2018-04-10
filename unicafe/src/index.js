import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvia: 0,
      neutraaleja: 0,
      huonoja: 0
    }
  }

  lisaa = (parametri) => {
    return this.setState({[parametri]: this.state[parametri] + 1})
  }
  

  render() {
    const yhteensa = this.state.hyvia + this.state.neutraaleja + this.state.huonoja
    const keskiarvo = (this.state.hyvia - this.state.huonoja)/yhteensa||0
    const positiivisia = ((100 * this.state.hyvia/yhteensa)||0) + " %"
    const data = [["hyvä ", this.state.hyvia], ["neutraali ", this.state.neutraaleja], ["huono ", this.state.huonoja], ["keskiarvo ", keskiarvo], ["positiivisia ", positiivisia]]
    return (
      <div>
        <Header text="anna palautetta"/>
        <Button handleClick = {() => this.lisaa('hyvia')} text = "hyvä" />
        <Button handleClick = {() => this.lisaa('neutraaleja')} text = "neutraali" />
        <Button handleClick = {() => this.lisaa('huonoja')} text = "huono" />
        <Statistics yhteensa = {yhteensa} data = {data} />
      </div>
    )
  }
}

const Statistics = ({yhteensa,data}) => {
  if(yhteensa>0) {
    return (<div>
      <Header text="statistiikka"/>
      <table><tbody>{data.map((datum)=><Statistic key={datum[0]} data={datum}/>)}</tbody></table>
    </div>)
  } else {
    return (
      <div>
      <Header text="statistiikka"/>
      <p>ei yhtään palautetta annettu</p>
      </div>)
  }
}

const Header = ({text}) => <h1>{text}</h1>
const Statistic = ({data}) => <tr><td>{data[0]}</td><td>{data[1]}</td></tr>

const Button = ({ handleClick, text }) => {
  return (<button onClick={handleClick}>
    {text}
  </button>)
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)