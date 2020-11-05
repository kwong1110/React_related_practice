export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // 파라미터는 1개를 사용(비구조화할당)한다는
  // 전제하에 param을 파라미터로 가져온다. param: post/posts가 들어가는 것.
  return (param) => async (dispatch) => {
    // console.log("\t파람확인 : " + param);
    dispatch({ type, param });
    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      // Flux Standard Action (FSA 규칙)
      // 유틸 함수를 만들때 유용하다
      // 규칙1 : 모든 action의 추가 적인 값을 payload로 통일
      // 규칙2 : 에러 발생 할 때엔 error를 true로 수정한다.
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

const defaultIdSelector = (param) => param;
// idSelector : api를 호출할 때 사용하는 파라미터에서 id를 어떻게 선택할지.
export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    const id = idSelector(param);
    // console.log("\t파람확인 : " + param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload,
        meta: id,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
        meta: id,
      });
    }
  };
};

// key : post, posts
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

export const handleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null
            ),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
    }
  };
};

// 객체를 넣어도 상관은 없지만, 함수로 만들어주게 되면
// data의 기본값을 파라미터로 받아 올 수 있다.
export const reducerUtils = {
  initial: (initialData = null) => ({
    data: initialData,
    loading: false,
    error: null,
  }),
  // 이전 데이타를 불러와서 사용 할 경우를 위해 prevState를 파라미터로 받음.
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (payload) => ({
    data: payload,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error: error,
  }),
};
