import React from 'react';

const Phonebook = ({personToShow, text, handleDelete}) => {
return (
    <div>

<h2>{text}</h2>

{console.log(personToShow)}
{personToShow.length > 0 ? personToShow.map(person => {
  return <p key={person.id}>{person.name} {person.number}<button onClick={()=>handleDelete(person)}>Delete</button></p>
}): null}
    </div>
)
}

export default Phonebook