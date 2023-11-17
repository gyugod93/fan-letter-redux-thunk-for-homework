import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function DetailPages({ letters, setLetters }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const params = useParams();
  const findLetters = letters.find((letter) => letter.id === params.id);
  const navigate = useNavigate();

  const handleDelete = () => {
    //확인 메세지
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      const updatedLetters = letters.filter(
        (letter) => letter.id !== params.id
      );
      setLetters(updatedLetters);
      navigate("/");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(findLetters.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() === findLetters.content.trim()) {
      alert("아무런 수정사항이 없습니다.");
      setIsEditing(false);
    } else {
      const updatedLetters = letters.map((letter) =>
        letter.id === params.id ? { ...letter, content: editedContent } : letter
      );
      setLetters(updatedLetters);
      setIsEditing(false);
      navigate("/");
    }
  };

  return (
    <>
      <ChangePage>
        <button onClick={() => navigate("/")}>홈으로</button>
      </ChangePage>
      <MainLetter>
        {findLetters && (
          <div>
            <Title>
              <ImgNickname>
                <img src={findLetters.profileImage} alt="" />
                <p>{findLetters.nickname}</p>
              </ImgNickname>
              <p>{findLetters.createdAt}</p>
            </Title>
            <p>To : {findLetters.member}</p>
            <Content isEditing={isEditing}>
              {isEditing ? (
                <textarea
                  value={editedContent}
                  onChange={(e) => {
                    if (e.target.value.length <= 100) {
                      setEditedContent(e.target.value);
                    }
                  }}
                />
              ) : (
                <p>{findLetters.content}</p>
              )}
            </Content>
            <Btn>
              {isEditing ? (
                <button onClick={handleSaveEdit}>수정 완료</button>
              ) : (
                <div>
                  <button onClick={handleEdit}>수정</button>
                  <button onClick={handleDelete}>삭제</button>
                </div>
              )}
            </Btn>
          </div>
        )}
      </MainLetter>
    </>
  );
}

const ChangePage = styled.div`
  button {
    margin: 50px;
    background-color: black;
    box-shadow: gray 10px 10px 10px;
    color: white;
    font-size: 20px;
    width: 110px;
    height: 60px;
  }
`;

const MainLetter = styled.div`
  width: 55vw;
  height: 55vh;
  margin: 150px auto;
  padding: 20px;
  background-color: gray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 23px;

  img {
    width: 5vw;
    border-radius: 50%;
    margin: 10px;
  }
`;
const ImgNickname = styled.div`
  display: flex;
  align-items: center;
  font-size: 45px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  background-color: black;
  width: 53vw;
  height: 30vh;
  margin: 20px auto;
  border-radius: 10px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 3;

  textarea {
    background-color: black;
    width: 53vw;
    height: 30vh;
    margin: 20px auto;
    border-radius: 10px;
    font-size: 40px;
    color: white;
    text-align: center;
    line-height: 3;
  }
`;

const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    font-size: 35px;
    margin-right: 10px;
  }
`;
export default DetailPages;

//페이지만들기
//수정삭제기능 적용하기
