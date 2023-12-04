import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { choiseMember } from "redux/modules/selectMember";

function MemberList() {
  const selectMember = useSelector(
    (state) => state.selectMember.selectMemberId
  );
  const dispatch = useDispatch();

  const members = [
    { id: 0, name: "이찬혁" },
    { id: 1, name: "이수현" },
  ];

  return (
    <Container>
      {members.map((member) => {
        return (
          <StyledBtn
            key={member.id}
            $select={selectMember}
            id={member.id}
            onClick={() => {
              dispatch(choiseMember(member.id));
            }}
          >
            {member.name}
          </StyledBtn>
        );
      })}
    </Container>
  );
}

const StyledBtn = styled.button`
  background-color: ${(props) =>
    props.$select === props.id ? "yellow" : "white"};
  //버튼 사이 간격
  margin-left: 20px;
  font-size: 40px;
  border-radius: 15px;
`;

const Container = styled.div`
  background-color: #a3a3a3;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 400px;
  margin: 140px auto;
`;

export default MemberList;
