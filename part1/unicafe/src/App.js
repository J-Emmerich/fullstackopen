import React, { useState } from "react";

const Header = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};
const Button = ({ clickHandler, text }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const Stats = ({ good, bad, neutral, all, average, percent }) => {
  return (
    <table>
      <tbody>

      <StatisticLine text="Amount good" value={good} />
      <StatisticLine text="Amount bad" value={bad} />
      <StatisticLine text="Amount neutral" value={neutral} />
      <StatisticLine text="All feedbacks" value={all} />
      <StatisticLine text="Average value" value={average} />
      <StatisticLine text="Percent of positive" value={percent} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
  <td>
    {text}: {value}
  </td>
  </tr>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const neutralText = "Neutral";
  const negativeText = "BAD";
  const positiveText = "GOOD";

  const negativeFeedback = () => {
    setBad(bad + 1);
  };
  const neutralFeedback = () => {
    setNeutral(neutral + 1);
  };
  const positiveFeedback = () => {
    setGood(good + 1);
  };
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const percent = (good / all) * 100;
  return (
    <div>
      <Header title="Unicafe is awesome" />
      <Button clickHandler={negativeFeedback} text={negativeText} />
      <Button clickHandler={neutralFeedback} text={neutralText} />
      <Button clickHandler={positiveFeedback} text={positiveText} />
      {all > 0 ? (
        <Stats
          good={good}
          bad={bad}
          neutral={neutral}
          all={all}
          average={average}
          percent={percent}
        />
      ) : (
        <p>"No feedback given"</p>
      )}
    </div>
  );
};

export default App;
