import React from 'react'


const Course = ({course}) => {
    return (
      <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </>
    )
  }
  
  const Header = ({name}) => {
    return (
      <>
        <h1>{name}</h1>
      </>
    );
  };
  
  const Content = ({parts}) => {
    return (
      <>
      {parts.map(part => <Parts key={part.id} name={part.name} exercises={part.exercises} /> )}
       
       </>
    );
  };
  
  const Total = ({parts}) => {
    console.log(parts);
    return (
      <p>
        Number of exercises{parts.reduce((acc, item) => {
        console.log(item);
         return acc + item.exercises
        }, 0)}
      </p>
    );
  };
  
  const Parts = ({name, exercises}) => {
    return (
      <p>
        {name}
        {exercises}
      </p>
    );
  };
  

export default Course