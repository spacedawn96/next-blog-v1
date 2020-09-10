import React from 'react';
import styled from 'styled-components';
import LabelInput from '../common/LabelInput';
import Buttons from '../common/Button';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';
import media from 'src/styles/media';
import { toast, ToastContainer } from 'react-nextjs-toast';

const RegisterFormTap = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: flex-end;
  ${media.custom(500)} {
    display: flex;
    justify-content: center;
  }
  .auth-btn {
    width: 150%;
    display: flex;
    justify-content: flex-end;
    ${media.custom(500)} {
      width: 100%;
    }
  }
`;

type inputArray = {
  username: string;
  email: string;
  password: string;
};

export type RegisterFormProps = {
  inputs: inputArray;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  registerError: ApolloError;
};

function RegisterForm(props: RegisterFormProps) {
  return (
    <RegisterFormTap>
      <form onSubmit={props.handleSubmit}>
        <LabelInput
          label="UserName"
          placeholder="UserName"
          name="username"
          type="text"
          value={props.inputs?.username}
          onChange={props.handleChange}
        />
        <LabelInput
          label="Email"
          placeholder="Your Email"
          name="email"
          type="email"
          value={props.inputs?.email}
          onChange={props.handleChange}
        />
        <LabelInput
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={props.inputs?.password}
          onChange={props.handleChange}
        />
        <div className="auth-btn">
          <Buttons color="blue" size={24} iconAfter="arrow-right">
            Sign Up
          </Buttons>
        </div>
      </form>
    </RegisterFormTap>
  );
}

export default RegisterForm;
