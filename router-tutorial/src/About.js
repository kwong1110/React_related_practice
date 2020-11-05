import React from "react";
import qs from "qs";

function About({ location }) {
  // console.log(location);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
    // 이걸 넣어주어야만 ? 없이 제대로 인식함.
    // location.search 값을 읽어야하는데
    // ? 가 포함되어있기 때문에 qs 라이브러리로 파싱.
  });

  const detail = query.detail === "true";
  // true는 문자열로 받아오게 되어잇어서
  // 문자열로 받아주어야함.
  // 숫자로 받아올 경우 parseInt(query.id, 10);
  // 문자를 숫자로 변형하여 사용 해야함.
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리엑트 라우터 기초를 실습해보는 예제 프로젝트입니다.</p>
      {detail && <p>detail값이 true입니다!</p>}
    </div>
  );
}

export default About;
