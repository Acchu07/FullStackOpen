import { useState } from 'react'

const getRandomIntInclusive = (selectedCurrentValue) => {
  let selectedNewValue = selectedCurrentValue;
  while (selectedNewValue === selectedCurrentValue) {
    selectedNewValue = Math.floor(Math.random() * (7 - 0 + 1) + 0);
  }
  return selectedNewValue;
}

const arrayVotes = new Array(8).fill(0);

const handleVotes = (selectedCurrentValue,setMaxVotes) => {
  arrayVotes[selectedCurrentValue] += 1;
  setMaxVotes(arrayVotes.indexOf(Math.max(...arrayVotes)));
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [maxVotes, setMaxVotes] = useState(-1);

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]}
      </div>
      <Button text="Vote" onClick={() => handleVotes(selected,setMaxVotes)} />
      <Button text="Next Anecdote" onClick={() => setSelected(getRandomIntInclusive(selected))} />
      <div>
        <h2>Anecdote with most votes</h2>
        {maxVotes !== -1 && anecdotes[maxVotes]}
      </div>
    </div >
  )
}

function Button({ text, onClick }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )

}

export default App