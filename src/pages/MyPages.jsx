import React from "react";

function MyPages() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <div>프로필 관리</div>
      <div>{user.userId}</div>
      <div style={{ cursor: "pointer" }}>{user.avatar}</div>
      <div>{user.nickname}</div>
      <button>수정하기</button>
    </>
  );
}

export default MyPages;
