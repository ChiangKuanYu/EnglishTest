import React, { useEffect } from "react";

function CountDown(props) {
  //   console.log(props.time);

  useEffect(() => {
    let intervalId = setInterval(() => {
      props.setTime((time) => {
        if (time <= 1) {
          // 檢查是否為 0，為 0 則停止計時器
          clearInterval(intervalId);
          props.overTime("超時");
        }
        return time - 1; // 若時間非 0，每秒減少 1
      });
    }, 1000);

    // 清理計時器
    return () => clearInterval(intervalId);
  }, [props]);
  return (
    <div>
      <label className="second"> {props.time} 秒</label>
    </div>
  );
}

export default CountDown;
