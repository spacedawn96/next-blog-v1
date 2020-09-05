import { useQuery, useMutation } from '@apollo/client';
import { GET_Posts, Remove_Post } from 'src/graphql/post';
import { useRouter } from 'next/router';

export default function useDeletePost() {
  const [deletePost] = useMutation(Remove_Post);
  const { loading: loadingGetPost, error: errorGetPos, data: dataGetPost } = useQuery(
    GET_Posts,
  );
  const router = useRouter();

  const DeletePostSubmit = async () => {
    deletePost({
      variables: {
        post_id: router.query.slug,
      },
      update: (proxy, { data: deletePost }) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        const findItem = data?.posts?.filter(el => el.id == router.query.slug);
        const idx = data?.posts?.indexOf(findItem);
        const newone = data.posts.filter(el => el.id !== router.query.slug);

        console.log(newone);
        proxy.writeQuery({
          query: GET_Posts,
          data: {
            ...data,
            posts: [newone],
          },
        });
      },
    });
  };

  return { DeletePostSubmit };
}
