import React, { useContext, useRef } from 'react';
import { UserDispatch } from './App';
import useInputs from './useInputs';

function CreateUser(/*{ username, email, onChange, onCreate }*/) {
    // console.log('CreacteUser');
    const dispatch = useContext(UserDispatch);

    const nextId = useRef(4);

    const [form, onChange, reset] = useInputs({
        username: '',
        email: '',
    });
    const { username, email } = form;
    return (
        <div>
            <h3>배열에 항목 추가하기</h3>
            <input 
                name="username" placeholder="계정명" 
                onChange={onChange} value={username}
            />
            <input
                name="email" placeholder="이메일" 
                onChange={onChange} value={email}
            />
            <button onClick={() => {
                dispatch({
                    type: 'CREATE_USER',user: {
                    id: nextId.current,
                    username,
                    email,
                }})
                nextId.current += 1;
                reset();
            }}>등록</button>
        </div>
    );
}

export default React.memo(CreateUser);

// onclick에 있는 함수를 const onCreate () 화살표함수로 빼내어
// 좀 더 가독성과 코드생산성을 높일 수 있음