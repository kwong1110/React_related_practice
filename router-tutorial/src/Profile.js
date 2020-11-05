import React from "react";

const profileData = {
  kwong: {
    name: "광",
    description: "ㅎㅇㅎㅇ",
  },
  homer: {
    name: "호머 심슨",
    description: "심슨가족 아빠 캐릭터",
  },
};

function Profile({ match }) {
  // match라는 값은 라우트 컴포넌트에서 넣어주는 프롭스
  // 라우터를 사용하게되면 자동으로 받아와짐.

  const { username } = match.params;
  const profile = profileData[username];

  if (!profile) {
    return <div>{username}은 존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username} ({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
}

export default Profile;
