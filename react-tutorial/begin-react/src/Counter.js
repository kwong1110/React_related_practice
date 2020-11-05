import React, { useReducer } from 'react';

/* useState 사용
function Counter() {
    const [number, setNumber] = useState(0);
 //  const number = numberState[0];
	//	const setNumber = numberState[1]  의 비구조화 할당.

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1);
    };
    const onDecrease = () => {
        setNumber(number - 1);
    };
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}
*/

// useReducer 사용
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            throw new Error('Unhandled action');
    }
}

function Counter() {

    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT'
        })
    };
    const onDecrease = () => {
        dispatch({
            type: 'DECREMENT'
        })
    };
    return (
        <div>
            <h2>useState/useReducer를 통한 상태관리</h2>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}

export default Counter;