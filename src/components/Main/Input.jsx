import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __addLetter,
  __fetchLetters,
  deleteLetter,
} from "redux/modules/letters";
import { choiseMember } from "redux/modules/selectMember";
import axios from "axios";
import { logout } from "redux/modules/authSlice";
import Letter from "./Letter";

function Input() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__fetchLetters());
  }, [dispatch]);

  const [inputContent, setInputContent] = useState({
    content: "",
  });
  const [editingContent, setEditingContent] = useState({
    id: "",
    content: "",
  });

  const letters = useSelector((state) => state.letters.letters);
  console.log(letters);
  const selectMember = useSelector(
    (state) => state.selectMember.selectMemberId
  );

  const userInfo = localStorage.getItem("userInfo");
  const { id, avatar, nickname, accessToken } = JSON.parse(userInfo);

  const newLetterData = {
    ...inputContent,
    id: uuidv4(),
    nickname,
    avatar,
    userId: id,
    writedTo: selectMember,
    createAt: new Date().toLocaleString(),
  };

  const onSubmitHandler = async () => {
    try {
      if (!accessToken) {
        dispatch(logout());
      }

      const response = await axios.post(
        "http://localhost:4000/letters",
        newLetterData
      );
      await axios.get(
        "http://localhost:4000/letters?_sort=createAt&_order=desc"
      );
      dispatch(__addLetter(response.data));
      setInputContent("");
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const addLetterHandler = (e) => {
    e.preventDefault();
    onSubmitHandler();
  };

  return (
    <>
      <InputStyle>
        <form onSubmit={addLetterHandler}>
          <div>
            내용 :
            <textarea
              value={inputContent.content}
              onChange={
                (e) => {
                  // if (e.target.value.length <= 100) {
                  setInputContent((prevForm) => ({
                    ...prevForm,
                    content: e.target.value,
                  }));
                }
                // }
              }
              placeholder="최대 100자까지만 작성할 수 있습니다."
            />
          </div>
          <div>
            누구에게 보내실 건가요? {/* 고민좀해보자 */}
            <select
              value={selectMember}
              onChange={(e) => {
                console.log(
                  Number(e.target.value),
                  typeof Number(e.target.value)
                );
                dispatch(choiseMember(Number(e.target.value)));
              }}
            >
              <option value={0}>이찬혁</option>
              <option value={1}>이수현</option>
            </select>
          </div>
          <button type="submit">팬레터 등록</button>
        </form>
      </InputStyle>
      <Letter inputContent={inputContent} />
    </>
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
