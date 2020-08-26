import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_Posts, GET_Post } from 'src/graphql/post';

export default function useGetPost() {
  const {
    loading: singlePostLoding,
    error: singlePostError,
    data: singlePostData,
  } = useQuery(GET_Post);

  return {
    singlePostLoding,
    singlePostError,
    singlePostData,
  };
}
