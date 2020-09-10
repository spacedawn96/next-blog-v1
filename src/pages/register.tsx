import React, { useContext } from 'react';
import styled from 'styled-components';
import Navbar from 'src/component/TopBanner.tsx/NavBar';
import { item, Logo } from 'src/component/TopBanner.tsx';

import useRegister from 'src/hooks/useRegister';
import Card from 'src/component/Card';
import Footer from 'src/component/Footer';
import RegisterForm from 'src/component/forms/RegisterForm';
import heightMedia from 'src/styles/height';
// import useRegister from 'src/lib/hooks/useLogin';
// import { registerMutation } from 'src/lib/graphql/mutations/register';
// import { useApolloClient, useMutation } from 'react-apollo';

const RegisterTap = styled.div`
  background: #eceff3;
  height: 100vh;
  ${heightMedia.custom(800)} {
    height: unset;
    background: #fff;
  }
`;

export type RegisterProps = {};

function Register(props: RegisterProps) {
  const { inputs, handleChange, handleSubmit, registerError } = useRegister();

  return (
    <>
      <RegisterTap>
        <Navbar items={item} Logo={Logo} color="fff" />
        <Card title="Register">
          <RegisterForm
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            registerError={registerError}
          />
        </Card>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          {registerError?.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </p>
      </RegisterTap>
    </>
  );
}

export default Register;
