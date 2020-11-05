import React from "react";

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = (e) => {
    // 프롭스를 통해 상태와 함수들을 가져옴.
    onSetDiff(parseInt(e.target.value, 10));
    // 기본적으로 value는 문자열
    // 문자열을 int형으로 변환해주는 함수 10은 10진수!
  };
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
