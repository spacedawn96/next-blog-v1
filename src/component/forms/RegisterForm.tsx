import React from 'react';
import styled from 'styled-components';
import LabelInput from '../common/LabelInput';
import Buttons from '../common/Button';


const RegisterFormTap = styled.div`
  width: 20vw;
  margin: 0 auto;
  height: 41vh;
  display: flex;
  align-items: flex-end;
  .auth-btn{
    display: flex;
    justify-content: flex-end;
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
