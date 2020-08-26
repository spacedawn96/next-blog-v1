import { useMutation } from '@apollo/client';
import { registerMutation } from 'src/graphql/user';
import { useRouter } from 'next/router';
import useForms from 'src/component/common/useForm';

export default function useRegister() {
  const router = useRouter();
  const [inputs, handleChange] = useForms({
    username: '',
    email: '',
    password: '',
  });

  const [signUp] = useMutation(registerMutation);

  const handleSubmit = async e => {
    e.preventDefault();
    signUp({
      variables: inputs,
    });

    router.push('/login');
  };

  return { inputs, handleChange, handleSubmit };
}
