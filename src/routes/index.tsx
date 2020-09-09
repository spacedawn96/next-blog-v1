import TopBanner from 'src/component/TopBanner.tsx';
import PostCard from 'src/component/PostCard';
import styled from 'styled-components';
import { useState } from 'react';
import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Pagination from 'src/component/Pagination';
import Footer from 'src/component/Footer';
import { GET_Posts, Get_TopPost } from 'src/graphql/post';
import media from 'src/styles/media';
import { initializeApollo } from '../lib/apollo';
import useGetTopPosts from '../hooks/useGetTopPosts';
import useGetPosts from 'src/hooks/useGetPosts';

const TopBackground = styled.div`
  background: #f7f9fd;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  height: 50vh;
  padding: 1rem;
  ${media.custom(1900)} {
    height: auto;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  background: #f7f9fd;
  letter-spacing: -0.02em;
  color: #262626;
  width: 90%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  color: #262626;
  font-weight: bold;
  margin: 0 auto;
  padding-top: 2rem;
`;

const MainContent = styled.div`
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  padding: 1rem;
`;

const MainCard = styled.div`
  margin: 0 auto;
`;

const Top = styled.div`
  background: #f7f9fd;
`;
const MainTitle = styled(Title)`
  background: #fff;
`;
export type HomePageProps = {};

function IndexPage(props: HomePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(24);
  const { loading, error, data } = useGetPosts();
  const { TopPostData, topPostLoading, topPostError } = useGetTopPosts();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :!(</p>;

  if (topPostLoading) return <p>Loading...</p>;
  if (topPostError) return <p>Error :(</p>;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <TopBanner datas={TopPostData?.topFivePost.length} />
      <Top>
        <div>
          <Title>Most Popular Articles</Title>
        </div>
        <TopBackground>
          {TopPostData?.topFivePost.slice(0, 5).map(posts => (
            <>
              <MainCard>
                <PostCard {...posts} key={posts.id} isSmall={true} />
              </MainCard>
            </>
          ))}
        </TopBackground>
      </Top>
      <div>
        <MainTitle>Latest Articles</MainTitle>
      </div>
      <MainContent>
        {data?.posts.map(ele => (
          <>
            <MainCard>
              <PostCard large={true} isBig={true} {...ele} key={ele.id} />
            </MainCard>
          </>
        ))}
      </MainContent>
      <Pagination
        datas={data.posts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
}

export async function getStaticProps(ctx) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_Posts,
  });

  await apolloClient.query({
    query: Get_TopPost,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
