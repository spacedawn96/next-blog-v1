import React from 'react';
import styled from 'styled-components';
import { item, Logo } from 'src/component/TopBanner.tsx';
import Navbar from 'src/component/TopBanner.tsx/NavBar';
import useLogin from 'src/hooks/useLogin';
import Card from 'src/component/Card';
import Footer from 'src/component/Footer';
import LoginForm from 'src/component/forms/LoginForm';
import { withApollo } from 'src/lib/withApollo';
const LoginTap = styled.div`
  background: #eceff3;
  height: 80vh;
`;

export type LoginProps = {};

function Login(props: LoginProps) {
  const { inputs, handleChange, handleSubmit } = useLogin();

  return (
    <>
      <LoginTap>
        <Navbar items={item} Logo={Logo} color="fff" />
        <Card title="Login">
          <LoginForm
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Card>
      </LoginTap>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: false })(Login);
