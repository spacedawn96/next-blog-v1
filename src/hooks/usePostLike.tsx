import { useQuery, gql, useMutation } from '@apollo/client';
import { Get_TopPost, Like_Post, GET_Posts } from 'src/graphql/post';
import { useRouter } from 'next/router';

export default function usePostLike() {
  const [postLike, { error }] = useMutation(Like_Post);
  const { loading: loadingGetPost, error: errorGetPos, data: dataGetPost } = useQuery(
    GET_Posts,
  );
  const router = useRouter();

  console.log(dataGetPost)
  const isLikeBoolean = dataGetPost?.posts.find(el => el.id == router.query.slug).liked;

  console.log(isLikeBoolean);

  const LikehandleSubmit = async () => {
    const response = await postLike({
      variables: {
        id: router.query.slug,
      },
      update: (proxy, { data: postLike }) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        const findPost = data.posts.find(el => el.id == router.query.slug);

        console.log(data);
        console.log( postLike.likePost);
        
        proxy.writeQuery({
          query: GET_Posts,
          data: {
            ...data,
            posts: [postLike.likePost, findPost],
          },
        });
      },
    });
    console.log(response);
  };

  return { LikehandleSubmit , isLikeBoolean};
}
