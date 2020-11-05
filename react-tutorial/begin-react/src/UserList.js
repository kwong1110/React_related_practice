import React, { useEffect, useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user /*, onRemove, onToggle (ContextAPI실습) */ }){
    const { username, email, id, active } = user;
    const dispatch = useContext(UserDispatch);

    // useEffect 기본
    /* 
    useEffect(() => {
        console.log('컴포넌트가 화면에 나타남!');
        // props -> state
		// REST API
		// D3 Video.js (라이브러리)
		// setInterval, setTimeout
        return () => {
            console.log('컴포넌트가 화면에서 사라짐!');
            // clearInterval, clearTimeout
			// 라이브러리 인스턴스 제거
        }
    }, []);
    */

    // 적용해보기
    useEffect(() => {
        // console.log('user 값이 바뀐 후')
        // console.log(user);
        return () => {
            // console.log('user 값이 바뀌기 전');
            // console.log(user);
        }
    }, [user]);
        // 바뀌기전이 먼저 console에 찍힌 후 바뀐 값이 그 다음에 찍힘.

    return (
        <div>
            <b style={{
                color: active ? 'green' : 'black',
                cursor: 'pointer'
                }}
                onClick={() => dispatch({
                    type: 'TOGGLE_USER',
                    id
                })}
            >
                {username}
            </b>
            &nbsp;
            <span>({email})</span>
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                id
            })}>삭제</button>
        </div>
    )
});

function UserList({ users /*, onRemove, onToggle (ContextAPI실습)*/}) {
    return (
        <div>
            <h2>배열 렌더링하기</h2>
            {
                users.map(
                    user => (
                        <User user={user} key={user.id} 
                        //onRemove={onRemove} onToggle={onToggle} (ContextAPI실습)
                        />
                    )
                )
            }
        </div>
    );
};

export default React.memo(UserList);