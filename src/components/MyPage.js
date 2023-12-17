import styled from 'styled-components';

const Button = styled.button`
  //width: 100%;
  padding: 0.8rem;
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
const MyPage = (props) => {
  return (
    <div>
      <div>Your email address is {`${props.userInfo.email}`}</div>
      <br />
      <div>You're logged by {`${props.userInfo.provider}`}</div>
      <br />
      <Button onClick={() => props.logoutHandler()}>Log out</Button>
    </div>
  );
};
export default MyPage;
