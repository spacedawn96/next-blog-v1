import { useQuery, gql, useMutation } from '@apollo/client';
import { unFollowMutation, getUsersQuery, meQuery } from 'src/graphql/user';
import { GET_Posts } from 'src/graphql/post';
import { useRouter } from 'next/router';



export default function useUnfollowUser() {
  const router = useRouter();
  const { data } = useQuery(getUsersQuery);
  const { loading: meGetLoading, error: meGetError, data: meGetData } = useQuery(meQuery);
  const { loading :loadingGetPost , error :errorGetPos, data :dataGetPost } = useQuery(GET_Posts);

  const findName = meGetData?.me?.id;
  const postUserName = dataGetPost?.posts.find(el => el.id == router.query.slug).user.username;
const isFollowing = data?.users?.find(el => el.username == postUserName);

const BooleanIsFollowing = Boolean(isFollowing?.follower?.follower_id == findName);

  const [unFollowUser, { error: unfollowError }] = useMutation(unFollowMutation);

  const unFollowHandleSubmit = async () => {
    unFollowUser({
      variables: {
        username:  postUserName,
      },
      update: (proxy, { data: unFollowUser }) => {
        const data = proxy.readQuery({
          query: getUsersQuery,
        });

        console.log(unFollowUser);
        console.log(data);
        const findData = data.users.filter(el => el.username == postUserName);

        console.log(findData);
        proxy.writeQuery({
          query: getUsersQuery,
          data: {
            ...data,
            users: [unFollowUser.unFollowUser, findData[0].follower],
          },
        });
      },
    });
  };

  return { unFollowHandleSubmit, unfollowError };
}
