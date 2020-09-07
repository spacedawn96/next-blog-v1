import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import LabelInput from '../common/LabelInput';
import Buttons from '../common/Button';
import { useRouter } from 'next/router';
import Router from 'next/router';

const LoginFormTap = styled.div`
  width: 20vw;
  margin: 0 auto;
  height: 30vh;
  display: flex;
  align-items: flex-end;
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

interface inputArray {
  email: string;
  password: string;
}

export type LoginFormProps = {
  inputs: inputArray;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function LoginForm(props: LoginFormProps) {
  const router = useRouter();

  return (
    <LoginFormTap>
      <form onSubmit={props.handleSubmit}>
        <LabelInput
          label="Email"
          placeholder="Your Email"
          name="email"
          value={props.inputs.email}
          type="text"
          onChange={props.handleChange}
        />
        <LabelInput
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={props.inputs.password}
          onChange={props.handleChange}
        />
        <div className="button-wrapper">
          <Buttons
            color="blue"
            size={24}
            iconAfter="arrow-right"
            style={{ marginRight: '1rem' }}>
            Sign In
          </Buttons>

          <Buttons color="blue" size={24} iconBefore="edit">
            Create Account
          </Buttons>
        </div>
      </form>
    </LoginFormTap>
  );
}

export default LoginForm;
