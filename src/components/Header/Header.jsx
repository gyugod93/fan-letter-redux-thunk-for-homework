import React, { useContext } from "react";
import MemberList from "./MemberList";
import styled from "styled-components";

function Header() {
  return (
    <>
      <BackgroundImage>
        <h1>악동뮤지션 팬레터 콜렉션</h1>
        <MemberList />
      </BackgroundImage>
    </>
  );
}

const BackgroundImage = styled.div`
  background-image: url(https://images.chosun.com/resizer/xwKKZrerr3c6-Dvs4eoY0rN9W8E=/640x336/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/SXZLB32QFPM7X5DYW3BNGDJUM4.jpg);
  background-size: contain;
  /* background-position: center; */
  height: 350px;
  text-align: center;
  color: #86b9c7;
  padding: 20px;
  font-size: 70px;
  margin-bottom: 20px;
`;
export default Header;
