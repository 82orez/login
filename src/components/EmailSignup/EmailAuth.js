import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BodyContainer = styled.div`
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

const AlertMessage = styled.div`
  // color props 가 있을 경우 해당 색상을 사용하고, 없을 경우 기본값으로 red 를 사용합니다.
  color: ${(props) => props.color || 'red'};
  display: ${(props) => (props.message ? 'block' : 'none')};
`;

const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [timer, setTimer] = useState(null);

  const [token, setToken] = useState('');
  const [alertToken, setAlertToken] = useState(null);

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setAlertMessage({ message: '인증 코드가 만료 되었어요.', color: 'red' }); // 타이머가 0이 되었을 때 경고 메시지를 설정합니다.
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleOnEmail = (e) => {
    setEmail(e.target.value);

    // 이메일 형식이 맞는지 확인합니다.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(emailRegex.test(e.target.value));
  };

  const handleOnToken = (e) => {
    setToken(e.target.value);
  };

  const reqEmailAuth = () => {
    // e.preventDefault();
    if (!isValidEmail) {
      // 이메일 형식이 맞지 않으면 함수를 종료합니다.
      setAlertMessage({ message: '정확한 이메일을 입력해 주세요.', color: 'red' });
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/email`, {
        email: email,
      })
      .then((res) => {
        if (res.data.result === 'Google' || res.data.result === 'Kakao' || res.data.result === 'Email') {
          setAlertMessage({ message: `이미 가입한 ${res.data.result} 계정이 있어요!`, color: 'red' });
        } else {
          setAlertMessage({ message: '메일로 인증 코드를 발송했어요.', color: 'blue' });
          setTimer(180); // 타이머를 3분(180초)으로 설정
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // !
  const reqVerifyToken = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/verify`, {
        email: email,
        token: token,
      })
      .then((res) => {
        if (res.data.result === 'User verified') {
          setTimer(null);
          // setAlertToken({ message: `${res.data.result}`, color: 'blue' });
          setAlertToken({ message: '인증에 성공했습니다.', color: 'blue' });
        } else {
          setAlertToken({ message: '인증에 실패했습니다.', color: 'red' });
        }
        console.log(res.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <BodyContainer>
      <Container>
        <h1>회원 가입</h1>
        <br />
        <h3 style={{ marginBottom: '5rem' }}>이메일 인증을 먼저 진행해 주세요.</h3>
        <Label>
          <div>아이디</div>
          <AlertMessage message={alertMessage?.message} color={alertMessage?.color}>
            {alertMessage?.message}
          </AlertMessage>
        </Label>
        <InputArea>
          <Input
            disabled={alertMessage?.message === '메일로 인증 코드를 발송했어요.'}
            type="email"
            placeholder="Email address"
            onChange={handleOnEmail}
          />
          <Button disabled={!email || alertMessage?.message === '메일로 인증 코드를 발송했어요.'} onClick={reqEmailAuth}>
            {timer ? formatTime(timer) : '인증 요청'}
          </Button>
        </InputArea>
        <Label>
          <div>인증코드</div>
          <AlertMessage message={alertToken?.message} color={alertToken?.color}>
            {alertToken?.message}
          </AlertMessage>
        </Label>
        <InputArea>
          <Input
            disabled={alertMessage?.message !== '메일로 인증 코드를 발송했어요.'}
            type="text"
            placeholder="인증코드 6자를 입력하세요."
            onChange={handleOnToken}
          />
          <ConfirmBttn disabled={alertMessage?.message !== '메일로 인증 코드를 발송했어요.'} onClick={reqVerifyToken}>확 인</ConfirmBttn>
          {/*<ConfirmBttn onClick={reqVerifyToken}>확 인</ConfirmBttn>*/}
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
