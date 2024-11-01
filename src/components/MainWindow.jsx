import React, { useState, useEffect } from "react";
import "./MainWindow.css";
import Logo from "../assets/img/logo.png";

import Section from "./Section";
import TestCard from "./TestCard";
import PrepareCard from "./PrepareCard";
import EndCard from "./EndCard";

function MainWindow() {
  // 首頁標題說明(程度、題數、秒數)
  const [hoverInfo, setHoverInfo] = useState(null);
  // 頁面可視設定
  const [startVisible, setStartVisible] = useState(true);
  const [prepareVisible, setPrepareVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  // 答題錯誤紀錄
  const [wrongCount, setWrongCount] = useState([]);
  // 設定程度
  const [level, setLevel] = useState("level1");
  const selection1 = [
    { name: "一級", value: "level1", count: "362", levelLike: "國中一年級" },
    { name: "二級", value: "level2", count: "449", levelLike: "國中二年級" },
    { name: "三級", value: "level3", count: "505", levelLike: "國中三年級" },
    { name: "四級", value: "level4", count: "1666", levelLike: "高中一年級" },
    { name: "五級", value: "level5", count: "1468", levelLike: "高中一年級" },
    { name: "六級", value: "level6", count: "1462", levelLike: "高中二年級" },
    { name: "七級", value: "level7", count: "1334", levelLike: "高中二年級" },
    { name: "八級", value: "level8", count: "1534", levelLike: "高中三年級" },
    { name: "九級", value: "level9", count: "1335", levelLike: "高中三年級" },
  ];
  // 設定題數
  const [count, setCount] = useState("50");
  const selection2 = [
    { name: "50", value: "50" },
    { name: "100", value: "100" },
    { name: "300", value: "300" },
    { name: "500", value: "500" },
  ];
  // 設定秒數
  const [second, setSecond] = useState("5");
  const selection3 = [
    { name: "5", value: "5" },
    { name: "10", value: "10" },
    { name: "不限制", value: null },
  ];

  // 生成隨機題目(index)
  const [testCount, setTestCount] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  function HandleStart() {
    setStartVisible(false);
    setPrepareVisible(true);
    setTestCount([]);
    // 不重複隨機題目
    let selectionCount = parseInt(count);
    let dataLength = parseInt(
      selection1.filter((selection) => selection.value === level)[0].count
    );
    if (selectionCount >= dataLength) {
      selectionCount = dataLength;
    }
    for (let i = 0; i < selectionCount; i++) {
      let random;
      do {
        random = Math.floor(Math.random() * dataLength);
      } while (random in testCount);
      setTestCount((oldArray) => [...oldArray, random]);
    }
    // 載入JSON檔
    setJsonData(require(`../assets/json/${level}.json`));
  }

  // 生成題庫(含選項)
  const [optionData, setOptionData] = useState([]);
  useEffect(() => {
    if (jsonData) {
      let optionArray = [];
      let answerArray = [];
      let defLength = 0;
      let data;
      for (let i = 0; i < testCount.length; i++) {
        answerArray = [];
        data = jsonData[testCount[i]];
        defLength = jsonData[testCount[i]].definitions.length;

        // 不同詞性翻譯，擇一當答案
        if (defLength >= 1) {
          let defRandom = Math.floor(Math.random() * defLength);
          answerArray[0] = `${data.definitions[defRandom].text}   (${data.definitions[defRandom].partOfSpeech})`;
        }
        // 填入其他錯誤答案
        for (let j = 1; j < 4; j++) {
          let random;
          do {
            random = Math.floor(Math.random() * jsonData.length);
          } while (random === testCount[i]);
          answerArray[
            j
          ] = `${jsonData[random].definitions[0].text}   (${jsonData[random].definitions[0].partOfSpeech})`;
        }
        // 打散答案順序
        let correctRandom = Math.floor(Math.random() * 4);
        const temp = answerArray[0];
        answerArray[0] = answerArray[correctRandom];
        answerArray[correctRandom] = temp;
        optionArray.push({
          id: testCount[i],
          word: jsonData[testCount[i]].word,
          answer: correctRandom,
          option: answerArray,
        });
      }
      setOptionData(optionArray);
    }
  }, [jsonData, testCount]);

  function returnClick() {
    setStartVisible(true);
    setPrepareVisible(false);
    setEndVisible(false);
    setTestCount([]);
    setOptionData([]);
  }

  function checkClick() {
    setPrepareVisible(false);
    setTestVisible(true);
    setEndVisible(false);
    setWrongCount([]);
  }

  function endPageChange() {
    setTestVisible(false);
    setEndVisible(true);
  }

  return (
    <div className="container">
      {startVisible && (
        <div className={startVisible ? "startpage" : "hidden"}>
          <img src={Logo} alt="logo" />
          <div className="selection">
            <Section
              title="程度"
              selection={selection1}
              onHover={setHoverInfo}
              onChange={setLevel}
              section={level}
            />
            <Section
              title="題數"
              selection={selection2}
              onHover={setHoverInfo}
              onChange={setCount}
              section={count}
            />
            <Section
              title="秒數"
              selection={selection3}
              onHover={setHoverInfo}
              onChange={setSecond}
              section={second}
            />
            {hoverInfo && (
              <div
                className="tooltip"
                style={{
                  position: "absolute",
                  top: hoverInfo.y,
                  left: hoverInfo.x,
                }}
              >
                {hoverInfo.value === "程度" && (
                  <div>
                    <h3>程度</h3>
                    <p> 1-3 級約為國中程度</p>
                    <p> 4-9 級約為高中程度</p>
                  </div>
                )}
                {hoverInfo.value === "題數" && (
                  <div>
                    <h3>題數</h3>
                    <p> 選擇試驗題數，若題庫數量不足，則以題庫數量出題 </p>
                  </div>
                )}
                {hoverInfo.value === "秒數" && (
                  <div>
                    <h3>秒數</h3>
                    <p> 選擇答題秒數，超過時間視為回答錯誤 </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <label className="startButton" onClick={HandleStart}>
            START
          </label>
        </div>
      )}
      {prepareVisible && (
        <div className={prepareVisible ? "preparepage" : "hidden"}>
          <PrepareCard
            selection={selection1}
            level={level}
            count={count}
            second={second}
          />

          <div className="prepareButton">
            <label onClick={returnClick}>返回</label>
            <label onClick={checkClick}>開始</label>
          </div>
        </div>
      )}
      {testVisible && (
        <div className={testVisible ? "testpage" : "hidden"}>
          <TestCard
            question={optionData}
            second={second}
            wrongCount={setWrongCount}
            finish={endPageChange}
          />
        </div>
      )}
      {endVisible && (
        <div className={endVisible ? "endpage" : "hidden"}>
          <EndCard
            wrongCount={wrongCount}
            testCount={testCount}
            data={jsonData}
            return={returnClick}
            retry={checkClick}
            setTest={setTestCount}
          />
        </div>
      )}
    </div>
  );
}

export default MainWindow;
