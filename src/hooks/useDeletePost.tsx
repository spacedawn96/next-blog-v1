import { useQuery, useMutation } from '@apollo/client';
import { GET_Posts, Remove_Post, Get_TopPost } from 'src/graphql/post';
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

        const data2 = proxy.readQuery({
          query: Get_TopPost,
        });

        // const findItem = data?.posts?.filter(el => el.id == findId);
        // const idx = data?.posts?.indexOf(findItem);

        console.log(data2);

        proxy.writeQuery({
          query: Get_TopPost,
          data: {
            ...data2,
            topFivePost: [...data2.topFivePost.filter(i => i.id !== findId)],
          },
        });
        proxy.writeQuery({
          query: GET_Posts,
          data: {
            ...data,
            posts: [...data.posts.filter(i => i.id !== findId)],
          },
        });
      },
    });
    router.push('/');
  };

  return { DeletePostSubmit };
}
