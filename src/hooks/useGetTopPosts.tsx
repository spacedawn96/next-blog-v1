import { useQuery, gql, useMutation } from '@apollo/client';
import { Get_TopPost } from 'src/graphql/post';

export default function useGetTopPosts() {
  const { loading: topPostLoading, error: topPostError, data: TopPostData } = useQuery(
    Get_TopPost,
  );

  return {
    TopPostData,
    topPostLoading,
    topPostError,
  };
}
