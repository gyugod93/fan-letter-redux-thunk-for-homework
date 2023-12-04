import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { __deleteLetter, __fetchLetters } from "redux/modules/letters";

function Letter({ inputContent }) {
  const letters = useSelector((state) => state.letters.letters);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectMember = useSelector(
    (state) => state.selectMember.selectMemberId
  );

  const userInfo = localStorage.getItem("userInfo");
  const { id, avatar, nickname, accessToken } = JSON.parse(userInfo);
  useEffect(() => {
    dispatch(__fetchLetters());
  }, [dispatch]);
  const { isLoading, isError, error } = useSelector((state) => state.letters);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const newLetterData = {
    ...inputContent,
    id: uuidv4(),
    nickname,
    avatar,
    userId: id,
    writedTo: selectMember,
    createAt: new Date().toLocaleString(),
  };

  const goToDetailPage = (id) => {
    navigate(`/detailPages/${id}`);
  };
  const onDeleteButtonClickHandler = async (id) => {
    await axios.delete(`http://localhost:4000/letters/${id}`);
    console.log(id);
    dispatch(__deleteLetter(id));
  };

  return (
    <MainLetter>
      {letters.filter((letter) => letter.writedTo === selectMember).length ===
        0 && (
        <div>
          남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되어주세요!
        </div>
      )}
      {letters
        .filter((letter) => letter.writedTo === selectMember)
        .map((letter) => {
          return (
            <div
              onClick={() => goToDetailPage(letter.id)}
              id={letter.id}
              key={letter.id}
            >
              <LetterItem>
                <Section>
                  <img src={letter.avatar} alt="" />
                  <div>
                    <p>작성자 : {letter.nickname}</p>
                    <p>{letter.createAt}</p>
                  </div>
                </Section>
                <Content>
                  <p>{letter.content}</p>
                </Content>
              </LetterItem>
            </div>
          );
        })}
    </MainLetter>
  );
}

const MainLetter = styled.ul`
  width: 35vw;
  margin: auto;
  padding: 20px;
  background-color: #000000;
  border-radius: 10px;
  color: white;
  text-align: center;

  img {
    width: 100px;
    border-radius: 50%;
    margin: 10px;
  }

  ul {
    list-style: none;
  }
`;

const LetterItem = styled.li`
  /* display: flex; */
  flex-direction: column;
  padding: 20px;
  color: white;
  margin-bottom: 10px;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
  button {
    margin-top: 25px;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  font-size: 18px;

  p {
    margin-bottom: 20px;
  }
`;
const Content = styled.p`
  margin-left: 160px;
  background-color: #535353;
  height: 40px;
  //한줄에 text 나타나게하기
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  line-height: 2;
`;
export default Letter;
