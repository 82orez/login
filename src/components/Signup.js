import React, { useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  max-width: 460px;
  //background-color: #f7f7f7;

  margin: 0 1rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-size: 1rem;
    color: #858585;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 1rem;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    font-size: 1rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #427d9d;
  color: white;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #164863;
  }
`;

const Divider = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ccc;
  line-height: 0.1em;
  margin: 2rem 0;
`;

const DividerText = styled.span`
  background: white;
  padding: 0 1rem;
`;

const ExternalLoginButton = styled(Button)`
  background-color: white;
  color: #333;
  border: 1px solid #ccc;

  &:hover {
    background-color: #e7e7e7;
  }
`;

const SignupText = styled.p`
  color: #333;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #333;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin: 2.5rem 0; // 위 아래 간격을 원하는 px로 설정합니다.
`;

const LeftDiv = styled.div`
  font-size: 2.2rem;
  font-weight: bolder;
  text-align: left;
`;

const RightDiv = styled.div`
  text-align: right;
  font-size: 1.1rem;
`;
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleOnEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnPassword = (e) => {
    setPassword(e.target.value);
  };

  const isPasswordValid = (password) => {
    // 정규 표현식: 영문, 숫자 포함 8자 이상
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid(password)) {
      alert('비밀번호는 영문, 숫자 포함 8자 이상이어야 합니다.');
      setPassword(''); // 비밀번호 초기화
      passwordRef.current.focus(); // 비밀번호 입력 창으로 focus 이동
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.result === 'Existing Email') {
          alert('이미 가입된 이메일입니다.');
          setPassword(''); // 비밀번호 초기화
          emailRef.current.focus(); // 비밀번호 입력 창으로 focus 이동
        } else if (res.data.result === 'Insert success'){
          alert('회원 가입이 완료 되었습니다.');
          navigate('/'); // 회원 가입 성공 후 '/' 경로로 이동. 회원 가입만 완료된 상태이고 로그인 전이므로 로그인 화면으로 이동.
          console.log(res.data.result);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <BodyContainer>
      <LoginContainer>
        <HorizontalContainer>
          <LeftDiv>회원 가입</LeftDiv>
          <RightDiv>
            <Link to={'/Login'}>로그인 하러 가기.</Link>
          </RightDiv>
        </HorizontalContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Label htmlFor="email">Email address</Label>
          <Input type="email" id="email" placeholder="Email address" ref={emailRef} required={true} onChange={handleOnEmail}/>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id={'password'} placeholder="Password" ref={passwordRef} value={password} required={true} onChange={handleOnPassword}/>
          <Button type="submit">회원 가입</Button>
          <SignupText>
            Don't have an account? <a href="/signup">Sign up</a>
          </SignupText>
          <Divider>
            <DividerText>OR</DividerText>
          </Divider>
          <ExternalLoginButton>Continue with Google</ExternalLoginButton>
          <ExternalLoginButton>Continue with Microsoft Account</ExternalLoginButton>
        </LoginForm>
      </LoginContainer>
    </BodyContainer>
  )
}

export default Signup;