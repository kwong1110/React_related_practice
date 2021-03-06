import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, goToHome } from "../modules/posts";
import Post from "../components/Post";
import { reducerUtils } from "../lib/asyncUtils";

// postId 파라미터는 라우터를 통해 받아올 예정
function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getPost(postId));
  }, [postId, dispatch, data]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
