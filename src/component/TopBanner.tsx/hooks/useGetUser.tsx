import { useMeQuery, useLogoutMutation } from 'src/type/apolloComponent';
import { setAccessToken } from 'src/lib/accessToken';

export default function useGetUser() {
  const { data, loading, error } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const logoutButton = async () => {
    if (!loading && data.me) {
      await logout();
      setAccessToken('');
      await client!.resetStore();
    }
  };

  return {
    loading,
    error,
    data,
    logoutButton,
  };
}
