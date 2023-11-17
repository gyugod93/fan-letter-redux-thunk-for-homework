// import React, { useEffect } from "react";
// import fakeData from "fakeData.json";
import { useState } from "react";
import Input from "./Input";
import Letter from "./Letter";

function Main({ setSelectMember, selectMember, letters, setLetters }) {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   console.log("Letters after adding:", letters);
  // }, [letters]);

  // const filteredLetters = letters.filter(
  //   (letter) => letter.Id === selectedMemberId
  // );

  return (
    <>
      <Input
        nickname={nickname}
        setNickname={setNickname}
        content={content}
        setContent={setContent}
        selectMember={selectMember}
        setSelectMember={setSelectMember}
        letters={letters}
        setLetters={setLetters}
      />
      <Letter letters={letters} selectMember={selectMember} />

      {/* <ul>
        {fakeData.map((item) => (
          <li key={item.id}>
            <div>{item.nickname}</div>
            <div>{item.createdAt}</div>
            <div>{removeText(item.content, 40)}</div>
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default Main;
