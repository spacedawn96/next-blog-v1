import { setAccessToken } from 'src/lib/accessToken';
import { useMutation } from '@apollo/client';
import { MeQuery, MeDocument } from 'src/type/apolloComponent';
import { loginMutation } from 'src/graphql/user';
import { useRouter } from 'next/router';
import useForms from 'src/component/common/useForm';

export default function useLogin() {
  const [inputs, handleChange] = useForms({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [login] = useMutation(loginMutation);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await login({
      variables: inputs,
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.username,
          },
        });
      },
    });

    if (response.data) {
      setAccessToken(response.data.login.accessToken);
    }

    router.push('/');
  };

  return { inputs, handleChange, handleSubmit };
}
