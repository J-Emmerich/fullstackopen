import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};


const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Content = ({parts}) => {
  return (
    <>
      <Parts part={parts[0].name} exercises={parts[0].exercises} />
      <Parts part={parts[1].name} exercises={parts[1].exercises} />
      <Parts part={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const Parts = (props) => {
  return (
    <p>
      {props.part}
      {props.exercises}
    </p>
  );
};

export default App;