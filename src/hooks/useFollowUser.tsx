import { useQuery, gql, useMutation } from '@apollo/client';
import { followMutation, getUsersQuery, meQuery } from 'src/graphql/user';
import { useRouter } from 'next/router';
import { GET_Posts } from 'src/graphql/post';

export default function useFollowUser() {
  const router = useRouter();
  const { data } = useQuery(getUsersQuery);
  const { loading: meGetLoading, error: meGetError, data: meGetData } = useQuery(meQuery);
  const { loading: loadingGetPost, error: errorGetPos, data: dataGetPost } = useQuery(
    GET_Posts,
  );

  const findName = meGetData?.me?.id;
  const postUserName = dataGetPost?.posts.find(el => el.id == router.query.slug).user
    .username;
  const isFollowing = data?.users?.find(el => el.username == postUserName);

  const BooleanIsFollowing = Boolean(isFollowing?.follower?.follower_id == findName);

  const [followUser, { error }] = useMutation(followMutation);

  const followHandleSubmit = async () => {
    const response = await followUser({
      variables: {
        username: postUserName,
      },
      update: (proxy, { data: followUser }) => {
        const data = proxy.readQuery({
          query: getUsersQuery,
        });

        const findData = data.users.filter(el => el.username == postUserName);

        console.log(findData);
        console.log(followUser);
        proxy.writeQuery({
          query: getUsersQuery,
          data: {
            ...data,
            users: [followUser.followUser, findData[0].follower],
          },
        });
      },
    });
    return response;
  };

  return { followHandleSubmit, error, BooleanIsFollowing };
}
