const myLogger = (store) => (next) => (action) => {
  //console.log(action);
  //console.log("\tPrev : ", store.getState());
  const result = next(action);
  // action을 다음 미들웨어, 없다면 리듀서에게 전달 하겠다
  //console.log("\tNext : ", store.getState());
  // \t : tab 문자
  // action이 리듀서에서 처리가 된 다음에 다음상태를 가져옴.
  return result;
  // result : Container에서 dispatch되었을 때 반환되는 결과물, 기본: undefined
};

export default myLogger;
