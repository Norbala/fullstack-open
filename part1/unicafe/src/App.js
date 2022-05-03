import { useState } from 'react'


const BoldedH2 = ({text}) => {
  return (
    <>
      
      <h2>{text}</h2>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.button}>{props.text}</button>
    </>
  )
}
//

const Statistics = (props) => {
  if (props.value1===0&&props.value2===0&&props.value3===0) {
    return <div>No feedback given</div>
  }
  let sum = props.value1 + props.value2 + props.value3;
  let average = (props.value1*1+props.value2*0+props.value3*(-1))/sum;
  return (
    <div>
        <table>
        <tbody>
      <Singlestat text="good: " value={props.value1}/>
      <Singlestat text="neutral: " value={props.value2}/>
      <Singlestat text="bad: " value={props.value3}/>

          <tr>
            <td>All: </td> <td>{sum}</td>
          </tr>
          <tr>
            <td>Average: </td> <td>{average}</td>
          </tr>
          <tr>
            <td>Positive: </td> <td>{100*props.value1/sum}  %</td>
          </tr>
        </tbody>
        </table>

    </div>
  )
}

const Singlestat = ({text, value}) => {
  return (
    <>
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
    </>
    
//
  )
}


//
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Handlebutton = (x,y) => {
    x(y + 1)
    
  }

  return (
    <div>
      <BoldedH2 text={"Give feedback"} />
      <Button text="good" button={()=> Handlebutton(setGood, good)} />
      <Button text="neutral" button={()=> Handlebutton(setNeutral, neutral)}/>
      <Button text="bad" button={()=> Handlebutton(setBad, bad)}/>
      <BoldedH2 text={"Statistics"} />
      <Statistics value1={good} value2={neutral} value3={bad} />
    </div>

  )
}

export default App;
