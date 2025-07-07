import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleGood() {
    setGood(good + 1)
  }

  function handleBad() {
    setBad(bad + 1)
  }

  function handleNeutral() {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <ButtonGoodBadNeutral onClick={handleBad} text="Bad" />
      <ButtonGoodBadNeutral onClick={handleGood} text="Good" />
      <ButtonGoodBadNeutral onClick={handleNeutral} text="Neutral" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

function ButtonGoodBadNeutral({ onClick, text }) {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

function Statistics({ good, neutral, bad }) {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No Feedback yet</p>
      </div>
    )
  }
  const total = good + bad + neutral
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positiveFeedback = (good / total) * 100

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="Total" value={total} />
          <StatisticsLine text="Average" value={average} />
          <StatisticsLine text="Positive Feedback" value={`${positiveFeedback}%`} />
        </tbody>
      </table>
    </div>
  )
}

function StatisticsLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App