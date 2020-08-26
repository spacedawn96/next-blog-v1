import { useQuery, gql, useMutation } from '@apollo/client';
import { Get_TopPost, UnLike_Post, GET_Posts } from 'src/graphql/post';
import { useRouter } from 'next/router';

export default function usePostUnLike() {
  const [UnpostLike, { error }] = useMutation(UnLike_Post);
  const { loading: loadingGetPost, error: errorGetPos, data: dataGetPost } = useQuery(
    GET_Posts,
  );
  const router = useRouter();

  console.log(dataGetPost)
  const isUnLikeBoolean = dataGetPost?.posts.find(el => el.id == router.query.slug).liked;

  const UnlikehandleSubmit = async () => {
      UnpostLike({
      variables: {
        id: router.query.slug,
      },
      update: (proxy, { data: UnpostLike }) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });
        const findPost = data.posts.find(el => el.id == router.query.slug);
        console.log(findPost);
        console.log(UnpostLike);
        
        proxy.writeQuery({
          query: GET_Posts,
          data: {
            ...data,
            posts: [UnpostLike.unLikePost, findPost],
          },
        });
      },
    });
  };

  return { UnlikehandleSubmit ,isUnLikeBoolean};
}
