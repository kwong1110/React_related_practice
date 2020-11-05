import React, { useReducer, useMemo, createContext } from 'react';
import produce from 'immer';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './inputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
// import useInputs from './useInputs'; -> CreateUser에서 관리해보기
import ContextSample from './ContextSample';

// window.produce = produce; 
  // 콘솔창에서 produce를 사용가능하게 함.

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중...");
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'kwang',
      email: 'kwang1110',
      active: true,
    },
    {
      id: 2,
      username: 'munju',
      email: 'munju0206',
      active: false,
    },
    {
      id: 3,
      username: 'kiki',
      email: 'kiki1111',
      active: false,
    }
  ]
};

// immer를 사용해보기
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
      // return {
      //   inputs: initialState.inputs,
      //   users: state.users.concat(action.user)
      // }
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
      // return {
      //   ...state,
      //   users: state.users.map(user =>
      //     user.id === action.id
      //       ? { ...user, active: !user.active }
      //       : user
      //     )
      // }
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
      // return {
      //   ...state,
      //   users: state.users.filter(user => user.id !== action.id)
      // }
    default:
      throw new Error('Unhandled action');
  }
}

export const UserDispatch = createContext(null);
  // 기본값 필요 없으므로 null.
  // 위에서 import를 안해주면 React.createContext(null); 로 사용 가능.

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const { username, email } = form;
  */

    // state 안에 inputs와 users가 들어있으므로 비구조화할당하여 컴포넌트에게 전달.
  const { users } = state;

  // const nextId = useRef(4);
  /*
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset])
  */

    // Context 실습하면서 삭제.
  /*
  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);
    // dependence가 비어있는 이유 
    // 컴포넌트 만들때만 이 함수를 만들고 재사용 가능.

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);
  */

  // 활성 사용자 수 구하기
  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <UserDispatch.Provider value={dispatch}>
      <Wrapper>
        <Hello name="광!" isSpecial/>
      </Wrapper>
      <Counter />
      <InputSample />
      
      <UserList 
        users={users} 
        // onToggle={onToggle} onRemove={onRemove}
      />
      <CreateUser 
        /* username={username} email={email} 
        onChange={onChange} onCreate={onCreate} */
      />
      <div>활성 사용자 수 : {count}</div>

      <ContextSample />
    </UserDispatch.Provider>
  )
}

export default App;
