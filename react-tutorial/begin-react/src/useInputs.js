import { useState, useCallback } from "react";

// useReducer 사용
// function reducer(state, action) {
//     switch (action.type) {
//         // CHANGE
//         case 'ON_CHANGE':
//             return {
//                 ...state,
//                 [action.name]: action.value
//             };
//         // RESET
//         case 'RESET':
//             console.log(`reducer 'RESET' 진입`)
//             return Object.keys(state).reduce((acc, current) => {
//                 // console.log(Object.keys(state));
//                 // console.log(`acc? ${acc}`);
//                 // console.log(`current? ${current}`)

//                 acc[current] = '';
//                     // acc: 초기값은 username과 email이 담겨있는 배열이다.
//                     // current는 username, email 순서로 계산되어지며
//                     // 배열[username] : 배열안의 username 을 빈값으로 만든다.
//                     //                  다음 순서인 email도 마찬가지.

//                 return acc;
//             }, {});
//         default:
//             throw new Error('Unhandeld action in "useInput"');
//     }

// }

// function useInputs(initialForm) {
//     const [form, dispatch] = useReducer(reducer, initialForm);

//     const onChange = useCallback(e => {
//         const { name, value } = e.target;
//         dispatch({
//             type: 'ON_CHANGE',
//             name, value,
//         })
//     }, []);

//     const reset = useCallback(() => {
//         dispatch({
//             type: 'RESET',
//         })
//     }, []);

//     return [form, onChange, reset];
// }

// useState 사용

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  // form을 초기화 시키는 역할
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

export default useInputs;
