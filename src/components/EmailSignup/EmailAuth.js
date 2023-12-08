import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const BodyContainer = styled.body`
  display: flex;
  justify-content: center;
  align-items: center; // 추가된 코드
  height: 100vh; // 추가된 코드

  background-color: #f7f7f7;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: center;
  //height: 100vh;
  height: 100%;
  max-height: 660px;
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 12px;

  //margin: 0 1rem;
  padding: 2rem;

  text-align: center;
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 0.5rem;
`;

const InputArea = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
const Input = styled.input`
  //width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  flex-grow: 1;

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
  width: 6rem;
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

const ConfirmBttn = styled(Button)`
  background: #c3c8d9;

  &:hover {
    background: #6d6e73ff;
  }
`;

const ContinueBttn = styled(ConfirmBttn)`
  width: 100%;
  margin: 2rem 0;
`;

const EmailAuth = () => {
  const [email, setEmail] = useState('');

  const handleOnEmail = (e) => {
    setEmail(e.target.value);
  };



  return (
    <BodyContainer>
      <Container>
        <h1>회원 가입</h1>
        <br />
        <h3 style={{ marginBottom: '5rem' }}>이메일 인증을 먼저 진행해 주세요.</h3>
        <Label>
          <div>아이디</div>
          <div className={'alert'}>경고 메세지~~~~~~~</div>
        </Label>
        <InputArea>
          <Input type="email" placeholder="Email address" required={true}/>
          <Button>인증 요청</Button>
        </InputArea>
        <Label>
          <div>인증코드</div>
          <div>경고 메세지~~~~~~~</div>
        </Label>
        <InputArea>
          <Input type="text" placeholder="인증코드 6자를 입력하세요." />
          <ConfirmBttn>확 인</ConfirmBttn>
        </InputArea>
        <ContinueBttn>계속(1/3)</ContinueBttn>
        <Link to={'/login'}>
          <h4>다른 계정으로 로그인</h4>
        </Link>
      </Container>
    </BodyContainer>
  );
};

export default EmailAuth;
