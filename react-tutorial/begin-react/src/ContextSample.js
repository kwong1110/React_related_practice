import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue');
// 기본값

function Child() {
    const text = useContext(MyContext);
    return (
        <>
        <h2>contextAPI 연습하기</h2>
        <div>안녕하세요? {text}</div>
        </>
    );
}

function Parent() {
    return <Child />
}

function GrandParent() {
    return <Parent />
}

function ContextSample() {
    const [value, setValue] = useState(true);

    return (
        <MyContext.Provider value={value ? 'GOOD' : 'NO!!!'}>
            <GrandParent />
            <button onClick={() => setValue(!value)}>전환하기!</button>
        </MyContext.Provider>
    )
}

export default ContextSample;