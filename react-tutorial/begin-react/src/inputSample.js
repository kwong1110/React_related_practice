import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    });

    const nameInput = useRef();
    const { name, nickname } = inputs;

    const onChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);

        const { name, value } = e.target;
        
        setInputs({
            ...inputs,
            [name]: value,
            // 변수 자체에 접근하기 위해 []로 감싸줌
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        });
        nameInput.current.focus();
    };
    return (
        <div>
            <h2>input 상태 관리하기 (객체 상태 업데이트하기) </h2>
            <input 
                name="name" 
                placeholder="이름" 
                onChange={onChange} 
                value={name}
                ref={nameInput}
            />
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;