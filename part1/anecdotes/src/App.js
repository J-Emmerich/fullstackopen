import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
    return <button onClick={handleClick}>{text}</button>
}

const Quote = ({quote, text}) => {
    return (
        <div>
        <h2>
    {text}
    </h2>
    <p>
        {quote}
    </p>
        </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0)
  const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))
const [mostVoted, setMostVoted] = useState(-1)

const getRandomQuote = () => {
    const max = anecdotes.length -1;
    const random = Math.floor(Math.random() * (max + 1));
    console.log(random);
    setSelected(random)  
}

const handleVote = () => {
    const copy = [...votes]
    console.log(copy)
    copy[selected] += 1
    console.log(copy);
    setVoted(copy)
}

const showMostVoted = () => {
    //sort is chained with concat so it doesn't mutate original array
    const sortedVotes =  votes.concat().sort((a, b) => b - a)
console.log("sorted", sortedVotes);
console.log("original", votes);
const indexMostVoted = votes.indexOf(sortedVotes[0]);
console.log("most voted", indexMostVoted)
setMostVoted(indexMostVoted)


}

  return (
    <div>
     <Quote quote={anecdotes[selected]} text="Quote of the day"/>
    {mostVoted > -1 ? <Quote quote={anecdotes[mostVoted]}  text="Most Voted quote"/> : null }
      <Button handleClick={getRandomQuote} text="New quote" />
      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={showMostVoted} text="show Most voted" />
    </div>
  )
}

export default App