
import { useState } from 'react'

const H2 = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  let initRand = Math.floor(6.99*Math.random())

  const [selected, setSelected] = useState(initRand)
  const [points, setPoints] = useState({0: 0,1:0,2:0,3:0,4:0,5:0,6:0})
  const [mAnecdote, setAnecdote] = useState(0);
  const [shownAnecdote, setShown] = useState(<div></div>)
  
  const handler = () => {
    let rand = Math.floor(6.99*Math.random());
    setSelected(rand)
    console.log("rand ",rand);
  }
  
  const voteFunc = () => {
      let newPoints = {
        ...points,
        [selected]: points[selected] + 1
      }
      setPoints(newPoints);
      if (newPoints[selected]>mAnecdote) {
        setAnecdote(newPoints[selected])
        setShown(anecdotes[selected])
      }
  }

  return (
    <>
      <H2 text={"Anecdote of the day"} />
      <div> {anecdotes[selected]} </div>
      <p> has {points[selected]} votes  </p>
      <button onClick={()=>{voteFunc()}}>Vote</button>
      <button onClick={()=>handler()}>Next one</button>
      <H2 text={"The most voted anecdote"} />
      {shownAnecdote}
      <div> has {mAnecdote} votes </div>
    </>
      )
}
export default App;
