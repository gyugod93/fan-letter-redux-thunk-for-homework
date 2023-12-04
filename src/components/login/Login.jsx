import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "redux/modules/authSlice";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [userList, setUserList] = useState("");
  const dispatch = useDispatch();
  const idRegex = /^[a-zA-Z0-9]{4,10}$/;
  const passwordRegex = /^.{4,15}$/;
  const nicknameRegex = /^.{1,10}$/;
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const validateTokenURL = "https://moneyfulpublicpolicy.co.kr/validateToken";

  const fetchSignUp = async () => {
    const { data } = await axios.get("http://localhost:4000/signUp");
    setUserList(data);
  };

  useEffect(() => {
    fetchSignUp();
  }, []);

  const toggleSignUp = (e) => {
    e.preventDefault();
    setShowSignUp((prev) => !prev);
  };

  const inputIdHandler = (e) => {
    setId(e.target.value);
  };

  const inputPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const inputNicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const loginHandler = async () => {
    //id,비밀번호가 맞지 않습니다
    if (!idRegex.test(id)) {
      alert("아이디는 4~10글자로 입력해주세요");
    } else if (!passwordRegex.test(password)) {
      alert("비밀번호는 4~15글자로 입력해주세요");
    } else {
      try {
        const response = await axios.post(
          "https://moneyfulpublicpolicy.co.kr/login?expiresIn=1m",
          { id, password }
        );
        const { accessToken, avatar, nickname, userId } = response.data;

        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        setTokenExpiration(expirationTime);

        localStorage.setItem(
          "userInfo",
          JSON.stringify({ accessToken, avatar, nickname, userId })
        );
        dispatch(login({ accessToken, avatar, nickname, userId }));

        alert("로그인 성공!");
        navigate("/mainPages");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = localStorage.getItem("userInfo");
      if (!accessToken) {
        navigate("/");
        clearInterval(interval);
        return;
      }
      if (tokenExpiration && new Date().getTime() > tokenExpiration) {
        dispatch(logout());
        localStorage.removeItem("userInfo");
        setTokenExpiration(null);
        alert("자동 로그아웃되었습니다.");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [tokenExpiration, dispatch, navigate]);

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (!idRegex.test(id)) {
      return alert("아이디는 4~10글자로 입력해주세요");
    } else if (!passwordRegex.test(password)) {
      return alert("비밀번호는 4~15글자로 입력해주세요");
    } else if (!nicknameRegex.test(nickname)) {
      return alert("닉네임은 1~10글자로 입력해주세요");
    } else if (userList.some((user) => user.id === id)) {
      return alert("아이디가 이미 존재합니다.");
    }
    try {
      const response = await axios.post("http://localhost:4000/signUp", {
        id,
        password,
        nickname,
      });
      console.log("서버응답:", response);
      alert("회원가입 성공!");
      setShowSignUp(false);
      setId("");
      setPassword("");
      setNickname("");
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        { id, password, nickname }
      );
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledLogin>
      <button onClick={() => navigate("/MainPages")}>홈으로</button>
      {showSignUp ? (
        <>
          <div>회원가입</div>
          <input
            type="text"
            value={id}
            onChange={inputIdHandler}
            placeholder="아이디 (4~10글자)"
          />
          <input
            type="password"
            value={password}
            onChange={inputPasswordHandler}
            placeholder="비밀번호 (4~15글자)"
          />
          <input
            type="text"
            value={nickname}
            onChange={inputNicknameHandler}
            placeholder="닉네임 (1~10글자)"
          />
          <button type="submit" onClick={signUpHandler}>
            회원가입
          </button>
        </>
      ) : (
        <>
          <div>로그인</div>
          <input
            type="text"
            value={id}
            onChange={inputIdHandler}
            placeholder="아이디 (4~10글자)"
          />
          <input
            type="password"
            value={password}
            onChange={inputPasswordHandler}
            placeholder="비밀번호 (4~15글자)"
          />
          <button type="submit" onClick={loginHandler}>
            로그인
          </button>
        </>
      )}
      {showSignUp ? (
        <button onClick={toggleSignUp}>로그인</button>
      ) : (
        <button onClick={toggleSignUp}>회원가입</button>
      )}
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: antiquewhite;
  width: 400px;
  margin: auto;
  margin-top: 100px;
`;
