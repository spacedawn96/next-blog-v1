import React from 'react';
import styled from 'styled-components';
import { item, Logo } from 'src/component/TopBanner.tsx';
import Navbar from 'src/component/TopBanner.tsx/NavBar';
import useLogin from 'src/hooks/useLogin';
import Card from 'src/component/Card';
import Footer from 'src/component/Footer';
import LoginForm from 'src/component/forms/LoginForm';
import heightMedia from 'src/styles/height';
const LoginTap = styled.div`
  background: #eceff3;
  height: 100vh;
  ${heightMedia.custom(800)} {
    height: unset;
    background: #fff;
  }
`;

export type LoginProps = {};

function Login(props: LoginProps) {
  const { inputs, handleChange, handleSubmit, loginError } = useLogin();

  return (
    <>
      <LoginTap>
        <Navbar items={item} Logo={Logo} color="fff" />
        <Card title="Login">
          <LoginForm
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loginError={loginError}
          />
        </Card>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          {loginError?.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </p>
      </LoginTap>
    </>
  );
}

export default Login;
