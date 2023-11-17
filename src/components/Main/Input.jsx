import React from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

function Input({
  nickname,
  setNickname,
  content,
  setContent,
  selectMember,
  setSelectMember,
  setLetters,
}) {
  const addLetterHandler = (e) => {
    e.preventDefault();
    if (nickname.trim() && content.trim()) {
      const newLetter = {
        profileImage:
          "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png",
        member: selectMember,
        id: uuidv4(),
        nickname,
        createdAt: new Date().toLocaleString(),
        content,
      };
      //새로운 방식으로 만듬 함수형으로
      setLetters((prev) => [...prev, newLetter]);
      setNickname("");
      setContent("");
    } else {
      alert("닉네임과 내용 모두 입력해주세요");
    }
  };

  return (
    <InputStyle>
      <form onSubmit={addLetterHandler}>
        <div>
          닉네임 :
          <input
            type="text"
            value={nickname}
            onChange={(e) => {
              if (e.target.value.length <= 20) {
                setNickname(e.target.value);
              }
            }}
            placeholder="최대 20글자까지 작성할 수 있습니다."
          />
        </div>
        <div>
          내용 :
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                setContent(e.target.value);
              }
            }}
            placeholder="최대 100자까지만 작성할 수 있습니다."
          />
        </div>
        <div>
          누구에게 보내실 건가요? {/* 고민좀해보자 */}
          <select
            value={selectMember}
            onChange={(e) => setSelectMember(Number(e.target.value))}
          >
            <option value={0}>이찬혁</option>
            <option value={1}>이수현</option>
          </select>
        </div>
        <button>팬레터 등록</button>
      </form>
    </InputStyle>
  );
}

const InputStyle = styled.div`
  background-color: #797979;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 260px;
  width: 35vw;
  margin: 0 auto 30px;
  border-radius: 10px;

  div {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  input,
  textarea,
  select,
  button {
    margin-left: 30px;
    margin-bottom: 5px;
    height: 40px;
    padding: 5px;
    border-radius: 5px;
    font-size: 16px;
  }
  input {
    width: 25vw;
  }
  textarea {
    height: 5vh;
    width: 26vw;
  }
  select {
    width: 4.5vw;
  }
  button {
    display: flex;
    margin-left: auto;
  }
  button:hover {
    background-color: yellow;
  }
`;

export default Input;
