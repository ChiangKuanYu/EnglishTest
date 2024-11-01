import React, { useState } from "react";
import "./EndCard.css";

function EndCard(props) {
  const [wrongTopic, setWrongTopic] = useState(0);
  const jsonData = props.data;

  const correctNum = props.testCount.length - props.wrongCount.length;
  const wrongNum = props.wrongCount.length;
  const score = Math.floor((correctNum / props.testCount.length) * 100);

  function Comment(score) {
    if (score < 60) {
      return "狀況不太好喔 !";
    } else if (score < 80) {
      return "再接再厲 !";
    } else if (score < 90) {
      return "不錯喔 !";
    } else {
      return "太棒了 !";
    }
  }

  function HandleNext(event) {
    const value = event.target.getAttribute("value");
    if (value === "next") {
      if (wrongTopic + 1 < wrongNum) {
        setWrongTopic(wrongTopic + 1);
      }
    } else if (value === "pre") {
      if (wrongTopic - 1 >= 0) {
        setWrongTopic(wrongTopic - 1);
      }
    }
  }

  function wrongRetry() {
    props.setTest(props.wrongCount);
    props.retry();
  }
  return (
    <div className="endCard">
      <div className="state">
        <label>結果</label>
        <hr />
        <div className="stateContent">
          <div className="statistics">
            <label>
              正確：<span style={{ color: "blue" }}>{correctNum}</span>
            </label>
            <label>
              錯誤：<span style={{ color: "red" }}>{wrongNum}</span>
            </label>
          </div>
          <div className="score">
            <label>評價：{score} 分</label>
            <label>{Comment(score)}</label>
          </div>
        </div>
      </div>
      {wrongNum !== 0 && (
        <div className="review">
          <div className="reviewContent">
            <label>{jsonData[props.wrongCount[wrongTopic]].word}</label>
            <hr />
            {jsonData[props.wrongCount[wrongTopic]].definitions.map(
              (item, index) => {
                return (
                  <label key={index}>
                    {" "}
                    ({item.partOfSpeech}) {item.text}{" "}
                  </label>
                );
              }
            )}
          </div>
          <div className="reviewBut">
            <label onClick={HandleNext} value={"pre"}>
              {"<<"}
            </label>
            <label onClick={HandleNext} value={"next"}>
              {">>"}
            </label>
          </div>
        </div>
      )}
      <div className="selectionBut">
        <label onClick={props.return}>回首頁</label>
        <label onClick={props.retry}>重考</label>
        {wrongNum !== 0 && <label onClick={wrongRetry}>錯誤題複習</label>}
      </div>
    </div>
  );
}

export default EndCard;
