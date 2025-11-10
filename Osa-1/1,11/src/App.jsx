import { useState } from 'react'

const TableLine = (props) => {
  if (props.text2) {
    return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.text2}</td>
    </tr>
  )}else{
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )}
}
const Statistics = (props) => {
  if (props.all === 0){
    return(
      <p>No feedback given</p>
    )
  }else{
  return(
    <table>
      <tbody>
      <TableLine text = "good" value = {props.good}/>
      <TableLine text = "neutral" value = {props.neutral}/>
      <TableLine text = "bad" value = {props.bad}/>
      <TableLine text = "all" value = {props.all}/>
      <TableLine text = "average" value = {props.average}/>
      <TableLine text = "positive" value = {props.positive} text2 = "%"/>
      </tbody>
    </table>
  )
  }
}
const Button = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = (good/all)* 100

  return (
    <div>
      {/* otsikko */}
      <h1>give feedback</h1>
      {/* napit ja toiminta */}
      <Button onClick = {() => setGood(good + 1)} text = "good"/>
      <Button onClick = {() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button onClick = {() => setBad(bad + 1)} text = "bad"/>
      <h1>statistics</h1>
      {/* arvostelujen tulostus */}
      <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      average={average}
      positive={positive}
      />
    </div>
  )
}

export default App