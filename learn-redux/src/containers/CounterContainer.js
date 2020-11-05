import React from "react";
import Counter from "../components/Counter";
import { connect } from "react-redux";
import { increase, decrease, setDiff } from "../modules/counter";

function CounterContainer({ number, diff, increase, decrease, setDiff }) {
  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={increase}
      onDecrease={decrease}
      onSetDiff={setDiff}
    />
  );
}

// connect를 사용 할땐 2가지 함수를 선언해 주어야함
const mapStateToProps = (state) => ({
  number: state.counter.number,
  diff: state.counter.diff,
});

// const mapDispatchToProps = (dispatch) => ({
//   onIncrease: () => dispatch(increase()),
//   onDecrease: () => dispatch(decrease()),
//   onSetDiff: (diff) => dispatch(setDiff(diff)),
// });

// 위 3개를 불러오는것을 bindActionCreators을 사용
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       increase,
//       decrease,
//       setDiff,
//     },
//     dispatch
//   );

// 객체 타입으로 하게되면 connect 내부에서 bindActionC..이 자동으로
// 이루어져 바로 사용 가능.
const mapDispatchToProps = {
  increase,
  decrease,
  setDiff,
};

//const enhance = connect(mapStateToProps, mapDispatchToProps)
//export default enhance(CounterContainer)
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
