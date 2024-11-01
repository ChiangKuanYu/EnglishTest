import React from "react";
import "./PrepareCard.css";

function PrepareCard(props) {
  const a = props.selection.filter(
    (selection) => selection.value === props.level
  );

  let count = props.count;
  if (parseInt(a[0].count) <= props.count) {
    count = parseInt(a[0].count);
  }

  return (
    <div className="prepareCard">
      <h1>準備開始</h1>
      <hr />

      <div className="content">
        <label>您選擇的測驗內容為</label>
        <label>
          1.{a[0].name}：程度約為{" "}
          <span className="ingredient">{a[0].levelLike}</span>
        </label>
        <label>
          2.題數：總共 <span className="ingredient">{count}</span> 題
        </label>
        <label>
          3.秒數：答題時間為 <span className="ingredient">{props.second}</span>{" "}
          秒，超過時間視為錯誤
        </label>
        <label>
          4.答題：請<span className="ingredient">點選答案</span>，或使用
          <span className="ingredient">數字鍵1~4</span>作答
        </label>
      </div>
    </div>
  );
}

export default PrepareCard;
