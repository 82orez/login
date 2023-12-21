import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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
  max-height: 720px;

  width: 100%;
  max-width: 500px;

  background-color: white;
  border-radius: 12px;

  //margin: 0 1rem;
  padding: 2rem;

  text-align: center;

  @media (max-width: 460px) {
    padding: 1rem;
  }
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
  width: 5.5rem;
  padding: 0.8rem 0.1rem;
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

const PasswordArea = styled.div`
  width: 100%;
  position: relative;
`;

const PasswordInput = styled(Input)`
  width: 100%;
  margin-bottom: 0.5rem;
  //padding-right: 2rem;
`;

const FiEyeArea = styled.div`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const P = styled.p`
  width: 100%;
  text-align: left;
  margin-bottom: 1.8rem;

  font-style: italic;
  color: rgba(0, 0, 0, 0.5); // 이 코드는 폰트 색상을 검정색의 60% 투명도로 설정합니다.
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [timer, setTimer] = useState(null);

  const [token, setToken] = useState('');
  const [alertToken, setAlertToken] = useState(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertPasswordMessage, setAlertPasswordMessage] = useState(null);
  const [alertConfirmPasswordMessage, setAlertConfirmPasswordMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleOnPassword = (e) => {
    setPassword(e.target.value);

    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 영문, 숫자 포함 8자 이상
    if (regex.test(e.target.value)) {
      setAlertPasswordMessage(null);
    } else {
      setAlertPasswordMessage({ message: '영문, 숫자 포함 8자리 이상으로 작성해 주세요.' });
    }
  };

  const handleOnConfirmPassword = (e) => {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);

    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 영문, 숫자 포함 8자 이상

    if (confirmValue !== password) {
      setAlertConfirmPasswordMessage({ message: '비밀번호가 일치하지 않습니다.' });
    } else if (regex.test(password) && confirmValue === password) {
      setAlertConfirmPasswordMessage({ message: '비밀번호가 일치합니다.', color: 'blue' });
    } else {
      setAlertConfirmPasswordMessage({ message: '비밀번호를 확인해 주세요.' });
    }
  };

  const handleShowPassword = () => {
    if (password.length > 0) {
      setShowPassword(!showPassword);
    }
  };
  const handleShowConfirmPassword = () => {
    if (confirmPassword.length > 0) setShowConfirmPassword(!showConfirmPassword);
  };

  const reqEmailAuth = () => {
    // e.preventDefault();
    if (email.length === 0) {
      setAlertMessage({ message: '이메일을 입력해 주세요.' });
      return;
    }
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
        // 이미 가입된 이메일 계정이 있으면 서버로부터 provider 으로 응답 받고, 없으면 result 값을 응답 받음.
        if (res.data.provider) {
          setAlertMessage({ message: `이미 가입한 ${res.data.provider} 계정이 있어요!`, color: 'red' });
        } else {
          setAlertMessage({ message: '메일로 인증 코드를 발송했어요.', color: 'blue' });
          setTimer(180); // 타이머를 3분(180초)으로 설정
          console.log(res.data.result);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  const reqSignup = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.result === 'Signup success') {
          alert('회원 가입이 완료 되었습니다.');
          navigate('/'); // 회원 가입 성공 후 '/' 경로로 이동. 회원 가입만 완료된 상태이고 로그인 전이므로 로그인 화면으로 이동.
          console.log(res.data.result);
        }
      })
      .catch();
  };

  return (
    <BodyContainer>
      <Container>
        <h1>회원 가입</h1>
        <br />
        <h3 style={{ marginBottom: '2rem' }}>이메일과 비밀번호를 입력해 주세요.</h3>

        <Label>
          <div>이메일</div>
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
          <Button disabled={alertMessage?.message === '메일로 인증 코드를 발송했어요.'} onClick={reqEmailAuth}>
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
          <ConfirmBttn disabled={alertMessage?.message !== '메일로 인증 코드를 발송했어요.'} onClick={reqVerifyToken}>
            확 인
          </ConfirmBttn>
          {/*<ConfirmBttn onClick={reqVerifyToken}>확 인</ConfirmBttn>*/}
        </InputArea>
        <br />

        <Label>
          <div>비밀 번호</div>
          <AlertMessage message={alertPasswordMessage?.message} color={alertPasswordMessage?.color}>
            {alertPasswordMessage?.message}
          </AlertMessage>
        </Label>
        <PasswordArea>
          <PasswordInput
            disabled={alertToken?.message !== '인증에 성공했습니다.'}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀 번호를 입력해 주세요."
            onChange={handleOnPassword}
          />
          <FiEyeArea onClick={handleShowPassword}>{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}</FiEyeArea>
        </PasswordArea>
        <P>영문, 숫자 포함 8자 이상으로 입력해 주세요.</P>

        <Label>
          <div>비밀 번호 확인</div>
          <AlertMessage message={alertConfirmPasswordMessage?.message} color={alertConfirmPasswordMessage?.color}>
            {alertConfirmPasswordMessage?.message}
          </AlertMessage>
        </Label>
        <PasswordArea>
          <PasswordInput
            disabled={alertToken?.message !== '인증에 성공했습니다.'}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀 번호를 다시 입력해 주세요."
            onChange={handleOnConfirmPassword}
          />
          <FiEyeArea onClick={handleShowConfirmPassword}>{showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}</FiEyeArea>
        </PasswordArea>

        <ContinueBttn disabled={alertConfirmPasswordMessage?.message !== '비밀번호가 일치합니다.'} onClick={reqSignup}>
          회원 가입
        </ContinueBttn>
        <Link to={'/login'}>
          <h4>다른 계정으로 로그인</h4>
        </Link>
      </Container>
    </BodyContainer>
  );
};

export default Signup;
