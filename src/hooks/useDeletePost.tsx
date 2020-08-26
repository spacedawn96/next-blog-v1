import { useQuery, useMutation } from '@apollo/client';
import {  GET_Posts, Remove_Post } from 'src/graphql/post';
import { useRouter } from 'next/router';

export default function useDeletePost() {
  const [deletePost, ] = useMutation(Remove_Post);
  const { loading: loadingGetPost, error: errorGetPos, data: dataGetPost } = useQuery(
    GET_Posts,
  );
  const router = useRouter();

  console.log(dataGetPost);

  const DeletePostSubmit = async post_id => {
    deletePost({
      variables: {
        id: router.query.slug,
      },
      update: (proxy, { data: deletePost }) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        console.log(data);
        const findItem = data?.posts?.find(el => el.id == post_id)
        const idx = data?.posts?.indexOf(findItem)

        console.log(idx)
        // proxy.writeQuery({
        //   query: GET_Posts,
        //   data: {
        //     ...data,
        //     posts: [...data?.posts?.splice(idx ,1)],
        //   },
        // });
      },
    });
  };

  return { DeletePostSubmit };
}
