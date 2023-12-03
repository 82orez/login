import React from 'react';
import { useRef, useState } from 'react';
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
  background-color: #4caf50;
  color: white;
  margin-bottom: 1.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
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
  text-align: center;
  color: #333;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 1rem;
  // 로그인 상태 유지 가운데 정렬과 관련
  width: 100%;
`;

const Checkbox = styled.input`
  margin-bottom: 0.7rem;
  margin-right: 1rem;
  margin-left: 0.2rem;
  transform: scale(1.5);
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

const Login = ({ setUserInfo, setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkedKeepLogin, setCheckedKeepLogin] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleOnEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChecked = (e) => {
    setCheckedKeepLogin(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: email,
        password: password,
        checkedKeepLogin: checkedKeepLogin,
      });

      if (response.data.result === '존재하지 않는 이메일입니다.') {
        alert(response.data.result);
        setPassword('');
        emailRef.current.focus();
      } else if (response.data.result === '비밀번호가 일치하지 않습니다.') {
        alert(response.data.result);
        setPassword('');
        passwordRef.current.focus();
      } else if (response.data.result === 'Login success') {
        setIsLogin(true); // isLogin 상태가 true 로 변경되면 App 컴포넌트에서 재렌더링이 일어나고 결국 MyPage 컴포넌트가 렌더링 된다.
        setUserInfo({ email: response.data.email }); // 이메일 정보를 담은 객체로 상태 변경.
        // alert('성공');
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // ? 구글 로그인을 위해서는 form 태그의 action 속성으로 처리해야 함. -> 리디렉션 시에  CORS 위반 방지 차원.
  const RequestLoginWithGoogle = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/google`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <BodyContainer>
      <LoginContainer>
        <HorizontalContainer>
          <LeftDiv>로그인</LeftDiv>
          <RightDiv>
            <Link to={'/signup'}>아직 회원 가입 전이에요.</Link>
          </RightDiv>
        </HorizontalContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Label htmlFor="email">Email address</Label>
          <Input type="email" id="email" placeholder="Email address" ref={emailRef} required={true} onChange={handleOnEmail} />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id={'password'}
            placeholder="Password"
            ref={passwordRef}
            value={password}
            required={true}
            onChange={handleOnPassword}
          />
          <CheckboxContainer>
            <Checkbox type="checkbox" id="remember" onChange={handleOnChecked} />
            <Label htmlFor="remember">로그인 상태 유지</Label>
          </CheckboxContainer>
          <Button type="submit">Log in</Button>
        </LoginForm>
        <SignupText>
          Don't have an account? <a href="/signup">Sign up</a>
        </SignupText>
        <Divider>
          <DividerText>OR</DividerText>
        </Divider>
        <LoginForm action={`${process.env.REACT_APP_API_URL}/auth/google`}>
          <ExternalLoginButton>Action with Google</ExternalLoginButton>
        </LoginForm>
        <ExternalLoginButton>Continue with Microsoft Account</ExternalLoginButton>
      </LoginContainer>
    </BodyContainer>
  );
};

export default Login;
