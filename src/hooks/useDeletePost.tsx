import { useQuery, useMutation } from '@apollo/client';
import { GET_Posts, Remove_Post } from 'src/graphql/post';
import { useRouter } from 'next/router';

export default function useDeletePost() {
  const router = useRouter();
  const [deletePost] = useMutation(Remove_Post);

  const DeletePostSubmit = async (e, findId) => {
    e.preventDefault();
    deletePost({
      variables: {
        post_id: findId,
      },
      update: proxy => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        // const findItem = data?.posts?.filter(el => el.id == findId);
        // const idx = data?.posts?.indexOf(findItem);

        console.log(data);
        console.log(router.query.slug);
        proxy.writeQuery({
          query: GET_Posts,
          data: {
            ...data,
            posts: [...data.posts.filter(i => i.id !== router.query.slug)],
          },
        });
      },
    });
    router.push('/');
  };

  return { DeletePostSubmit };
}
