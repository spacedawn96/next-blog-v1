import { useQuery, gql, useMutation } from '@apollo/client';
import { Get_TopPost, Like_Post, GET_Posts, Edit_Post } from 'src/graphql/post';
import { useRouter } from 'next/router';

export default function useEditPost() {
  const [eidtPoast, { error }] = useMutation(Edit_Post);
  const { loading: loadingGetPost, error: errorGetPos, data: dataGetPost } = useQuery(
    GET_Posts,
  );
  const router = useRouter();

  console.log(dataGetPost);

  const EditSubmit = async () => {
    eidtPoast({
      variables: {
        post_id: router.query.slug,
        title: 'changed!!',
      },
      update: (proxy, { data: EditSubmit }) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        console.log(data);
        console.log(EditSubmit);

        // proxy.writeQuery({
        //   query: GET_Posts,
        //   data: {
        //     ...data,
        //     posts: [postLike.likePost, findPost],
        //   },
        // });
      },
    });
  };

  return { EditSubmit };
}
