import { createStore } from "redux";

const initialState = {
  counter: 0,
  text: "",
  list: [],
};

// 리덕스에서 관리할 상태 정의, 상태의 초기값 설정
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성 함수 작성 -> 액션 객체를 만들어 반환.
const increase = () => ({
  type: INCREASE,
});

const decrease = () => ({
  type: DECREASE,
});

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text,
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});
// -> 보통 액션타입 : 대문자 , 액션 생성함수 : 소문자 로 작성함.

function reducer(state = initialState, action) {
  // 기본값 설정 -> 리덕스에서 초기상태를 만들때 한번 호출 하는데
  // 그 시점에 스테이트가 undefined라면 초기상태가 만들어지지 않으니까
  // state가 undefined라면 initialState를 반환하겟단 의미.
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text, // action.text는 위에서 액션값에 넣어준것
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
        // List의 경우 push 말고 concat을 해주어야 불변성이 유지됨.
        // 기존의 리스트에 아이템을 추가한 새로운 배열을 만들어서
        // 기존의 리스트를 대체 시켜 주게됨
      };
    default:
      return state;
  }
}

const store = createStore(reducer); // 스토어 생성하기.

// store 구독 해보기
const listener = () => {
  const state = store.getState();
};

const unsubscribe = store.subscribe(listener);
// store.subscribe를 호출하게되면 unsubscribe 함수를 만들겟다는 것.
// unsubscribe();      // 구독을 해제할때 호출

// store dispatch 해보기
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));
