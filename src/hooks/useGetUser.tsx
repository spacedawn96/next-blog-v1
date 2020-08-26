import { useQuery, gql, useMutation } from '@apollo/client';
import { unFollowMutation, getUsersQuery, meQuery } from 'src/graphql/user';

export default function useGetUser() {
  const { loading: userGetLoading, error: usetGetError, data: userGetData } = useQuery(
    getUsersQuery,
  );

  return { userGetLoading, usetGetError, userGetData };
}
