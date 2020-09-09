import { useMutation } from '@apollo/client';
import { registerMutation } from 'src/graphql/user';
import { useRouter } from 'next/router';
import useForms from 'src/component/common/useForm';
import { useState } from 'react';

export default function useRegister() {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [inputs, handleChange] = useForms({
    username: '',
    email: '',
    password: '',
  });

  const [signUp, { error: registerError }] = useMutation(registerMutation, {
    onCompleted({ signUp }) {
      router.push('/login');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    signUp({
      variables: inputs,
    });
  };

  return { inputs, handleChange, handleSubmit, registerError };
}
