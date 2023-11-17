import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function EmptyLetter({ letters, selectMember }) {
  const navigate = useNavigate();
  const goToDetailPage = (id) => {
    navigate(`/detailPages/${id}`);
  };
  const removeText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength).trim() + "...";
    }
  };

  return (
    <MainLetter>
      {letters.filter((letter) => letter.member === selectMember).length ===
        0 && (
        <div>
          남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되어주세요!
        </div>
      )}
      {letters
        .filter((letter) => letter.member === selectMember)
        .map((letter) => {
          return (
            <div
              onClick={() => goToDetailPage(letter.id)}
              id={letter.id}
              key={letter.id}
            >
              <LetterItem>
                <Section>
                  <img src={letter.profileImage} alt="" />
                  {/* <p>{letter.member}</p>
              <br /> */}
                  <div>
                    <p>{letter.nickname}</p>
                    <p>{letter.createdAt}</p>
                  </div>
                </Section>
                <Content>{removeText(letter.content, 40)}</Content>
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
export default EmptyLetter;
