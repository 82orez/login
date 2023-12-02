import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyPage from './components/MyPage';
import axios from 'axios';

// ! 쿠키 적용을 위해 추가.
//  모든 요청에 withCredentials 가 true 로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const authHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/userInfo`)
      .then((res) => {
        // ? 서버의 응답의 result 값이 200 'Not Login Info' 이면 아무 것도 하지 않는다.
        if (res.data.result === 'Not Login Info') {
        } else {
          setIsLogin(true);
          setUserInfo({ email: res.data.email });
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response.data);
        }
      });
  };
  useEffect(() => {
    authHandler();
  }, []);

  const logoutHandler = () => {
    if (window.confirm('정말로 로그아웃 하시겠습니까?')) {
      return axios
        .post(`${process.env.REACT_APP_API_URL}/logout`)
        .then((res) => {
          setUserInfo(null);
          setIsLogin(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <MyPage isLogin={isLogin} setIsLogin={setIsLogin} setUserInfo={setUserInfo} userInfo={userInfo} logoutHandler={logoutHandler} />
            ) : (
              <Login setIsLogin={setIsLogin} setUserInfo={setUserInfo} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} setUserInfo={setUserInfo} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
