import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  //background-color: #f7f7f7;
  background-color: white;

  margin: 0 1rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 460px;
  align-items: center;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    font-size: 1rem;
    color: #858585;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    font-size: 1rem;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
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
  margin-bottom: 1rem;
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
  color: #333;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  //margin-bottom: 0.5rem;
  margin-right: 1rem;
`;

const Label = styled.label`
  color: #333;
`;

const LoginScreen = () => {
  return (
    <LoginContainer>
      <Title>Welcome back</Title>
      <LoginForm>
        <Input type="email" id={'email'} placeholder="Email address" required={true} />
        <Input type="password" placeholder="Password" required={true} />
        <CheckboxContainer>
          <Checkbox type="checkbox" id="remember" />
          <Label htmlFor="remember">로그인 상태 유지</Label>
        </CheckboxContainer>
        <Button type="submit">Continue</Button>
        <SignupText>
          Don't have an account? <a href="/signup">Sign up</a>
        </SignupText>
        <Divider>
          <DividerText>OR</DividerText>
        </Divider>
        <ExternalLoginButton>Continue with Google</ExternalLoginButton>
        <ExternalLoginButton>Continue with Microsoft Account</ExternalLoginButton>
        <ExternalLoginButton>Continue with Apple</ExternalLoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginScreen;
