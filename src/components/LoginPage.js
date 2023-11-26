import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
`;

const LoginContainer = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputGroup = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

// 이하 비슷한 패턴으로 나머지 CSS를 styled-components 형태로 작성

function LoginPage() {
  return (
    <Container>
      <LoginContainer>
        <h1>Welcome back</h1>
        <Form>
          <InputGroup>
            <Label htmlFor="email">Email address</Label>
            <Input type="email" id="email" name="email" required/>
          </InputGroup>
          <Button type="submit">Continue</Button>
          <p>Don't have an account? <a href="#">Sign up</a></p>
          <div>
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <div>
            <Button type="button">Continue with Google</Button>
            <Button type="button">Continue with Microsoft Account</Button>
            <Button type="button">Continue with Apple</Button>
          </div>
        </Form>
      </LoginContainer>
    </Container>
  );
}

export default LoginPage;
