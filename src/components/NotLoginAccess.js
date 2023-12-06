import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotLoginAccess = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isLogin) navigate('/');
  }, [props.isLogin]);

  return <>{props.children}</>;
};

export default NotLoginAccess;
