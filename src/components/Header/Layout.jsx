import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logout } from "redux/modules/authSlice";
import styled from "styled-components";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("userInfo");
    console.log(accessToken);
    if (!accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const logoutHandler = () => {
    const confirmLogout = window.confirm("정말 로그아웃하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("userInfo");
      dispatch(logout());
    } else {
      navigate("/mainPages");
    }
  };
  return (
    <>
      <StyledNav>
        <ul>
          <li>
            <Link to="/mainPages">HOME</Link>
          </li>
          <ProfileLogout>
            <li>
              <Link to="/myPages">내 프로필</Link>
            </li>
            <li>
              <Link to="/" onClick={logoutHandler}>
                로그아웃
              </Link>
            </li>
          </ProfileLogout>
        </ul>
      </StyledNav>
      <Outlet />
    </>
  );
}

export default Layout;

const StyledNav = styled.nav`
  ul {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #a97474;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const ProfileLogout = styled.div`
  display: flex;
  gap: 20px;
`;
