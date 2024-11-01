import React, { useState, useEffect } from "react";
import CountDown from "./CountDown";
import "./TestCard.css";

function TestCard(props) {
  const [testCount, setTestCount] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState([]);
  const [time, setTime] = useState(props.second); // 設定初始秒數
  const [finish, setFinish] = useState(false);

  const questions = props.question;

  // 滑鼠點擊答題
  function HandleAnswer(event) {
    const mouseAnswer = parseInt(event.target.getAttribute("value")) - 1;
    CheckAnswer(mouseAnswer);
  }
  // 數字鍵1-4答題(useEffect)
  const handleKeyPress = (event) => {
    const keyboardAnswer = parseInt(event.key) - 1;
    CheckAnswer(keyboardAnswer);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [testCount, score]);

  // 確認答案 & 計分
  function CheckAnswer(answer) {
    if ((answer >= 0 && answer < 4) || answer === "超時") {
      setTime(props.second);
      if (answer === questions[testCount].answer) {
        setScore(score + 1);
      } else {
        setWrongCount((oldArray) => [...oldArray, questions[testCount].id]);
      }
      if (testCount < questions.length - 1) {
        setTestCount(testCount + 1);
      } else {
        setFinish(true);
      }
    }
  }
  // 測驗結束 & 回傳錯誤題目
  useEffect(() => {
    if (finish) {
      props.wrongCount(wrongCount);
      props.finish();
    }
  }, [props, wrongCount, finish]);

  return (
    <div className="testCard">
      <div className="testCount">
        <label className="count"># {testCount + 1}</label>
        {props.second && finish === false && (
          <CountDown time={time} setTime={setTime} overTime={CheckAnswer} />
        )}
      </div>
      <div className="vocabulary">
        <label className="topic">{questions[testCount].word}</label>
        <hr />
        <div className="option">
          <label onClick={HandleAnswer} value="1">
            1. {questions[testCount].option[0]}
          </label>
          <label onClick={HandleAnswer} value="2">
            2. {questions[testCount].option[1]}
          </label>
          <label onClick={HandleAnswer} value="3">
            3. {questions[testCount].option[2]}
          </label>
          <label onClick={HandleAnswer} value="4">
            4. {questions[testCount].option[3]}
          </label>
        </div>
      </div>
    </div>
  );
}

export default TestCard;
