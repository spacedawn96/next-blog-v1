import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { EditorState, convertFromRaw } from 'draft-js';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import TopBanner from 'src/component/TopBanner.tsx';
import { capitalize } from 'src/utils/capitalize';
import moment from 'moment';
import createLinkDecorator from 'src/component/Editor/Decorators';
import Editor from 'draft-js-plugins-editor';
import useGetComments from '../../hooks/useGetComments';
import useCreateComment from 'src/hooks/useCreateComment';
import Face from 'src/component/Face';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Get_SubComment } from 'src/graphql/post';
import { useQuery, gql, useMutation } from '@apollo/client';
import { RiArrowDropDownLine } from 'react-icons/ri';
import useFollowUser from 'src/hooks/useFollowUser';
import useUnfollowUser from 'src/hooks/useUnfollowUser';
import useGetUser from 'src/hooks/useGetUser';
import { BsFillHeartFill } from 'react-icons/bs';
import PostLike from 'src/component/PostLike';
import usePostLike from 'src/hooks/usePostLike';
import usePostUnLike from 'src/hooks/usePostUnLike';
import useEditPost from 'src/hooks/useEditPost';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { PostInit } from 'src/store/post';
import useDeletePost from 'src/hooks/useDeletePost';
import CommentForm from 'src/component/forms/CommentForm';
import useGetPosts from 'src/hooks/useGetPosts';
import Buttons from 'src/component/common/Button';


const PostPageTap = styled.div`
  .post-wrapper {
    width: 40%;
    margin: 0 auto;
    padding: 6rem;
  }
  .card-wrapper {
    width: 50%;
    right: 0;
    margin: 0 auto;
    position: absolute;
  }
  .like-button-wrapper {
    position: absolute;
    left: 20%;
    margin-top: 8%;
  }
  .sticky-wrapper {
    position: sticky;
    top: 0;
  }
  .comments-count {
    margin: 1rem;
  }
  .dataFormat {
    border-bottom: 2px solid transparent;
    border-top: 2px solid transparent;
    font-size: 1rem;
    line-height: 1.5;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.04em !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif;
    color: rgba(38, 38, 38, 0.66);
  }
  .intro-wrapper {
    margin: 1rem 0;
  }
  .comments-wrapper {
    width: 40%;
    margin: 0 auto;
    padding: 6rem;
  }
  .commentsInput {
    margin-bottom: 1.5rem;
    width: 95%;
    font-size: 1rem;
    color: rgb(33, 37, 41);
    line-height: 1.75;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(233, 236, 239);
    border-image: initial;
    border-radius: 4px;
  }
  .comments-layout {
    text-align: left;
    color: rgb(52, 58, 64);
    margin: auto;
    padding: 1rem;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(233, 236, 239);
    border-image: initial;
    border-radius: 4px;
  }

  .button-flex {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 1rem;
  }

  .comments-text {
    padding-top: 1rem;
  }
  .comment-write-button {
    color: rgb(134, 142, 150);
    display: flex;
    align-items: center;
    padding-top: 1rem;
  }
  .subcomments-wrapper {
    margin-top: 0.4rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
  }
  .comments-text-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .comments-edit {
    display: flex;
    & div {
      margin-right: 1rem;
    }
  }
`;
const Title = styled.div`
  max-width: 780px;
  font-size: 48px;
  margin-bottom: 25px;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  letter-spacing: -0.022em;
  line-height: 1.35;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
`;

const SubComments = styled.div`
  width: 90%;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(33, 37, 41);
  border-color: rgb(233, 236, 239);
  border-image: initial;
  border-radius: 4px;
`;
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 4,
  },
  BOLD: {
    color: '#395296',
    fontWeight: 'bold',
  },
  ANYCUSTOMSTYLE: {
    color: '#00e400',
  },
  FANCYBLOCKQUOTE: {
    color: '#999',
    fontStyle: 'italic',
    fontFamily: `'Hoefler Text', Georgia, serif`,
    display: 'flex',
    justifyContent: 'center',
  },
  H1: {
    fontSize: '2rem',
  },
  H2: {
    fontSize: '1.5rem',
  },
  H3: {
    fontSize: '1.7rem',
  },
};

export type PostPageProps = {};

function PostPage(props: PostPageProps) {
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.post);
  const { loading, error: getError, data } = useGetPosts();
  const { commentsLoading, commentsError, commentstData } = useGetComments();
  const {
    textOnChange,
    subTextOnChange,
    handleSubmit,
    subHandleSubmit,
    getText,
    getSubText,
    isOpen,
    setIsopen,
  } = useCreateComment();
  const { followHandleSubmit, error, BooleanIsFollowing } = useFollowUser();
  const { unFollowHandleSubmit, unfollowError } = useUnfollowUser();
  const { userGetData } = useGetUser();
  const [on, toggle] = useState(false);
  const { LikehandleSubmit, isLikeBoolean } = usePostLike();
  const { UnlikehandleSubmit, isUnLikeBoolean } = usePostUnLike();
  const { EditSubmit } = useEditPost();
  const { DeletePostSubmit } = useDeletePost();

  const router = useRouter();

  if (loading) return <p>loading</p>;

  if (commentsLoading) return <p>Loading...</p>;
  if (commentsError) return <p>Error !:(</p>;

  const findData = data.posts.find(ele => ele.id == router.query.slug);
  const staticToolbarPlugin = createToolbarPlugin();

  const DBEditorState = convertFromRaw(JSON.parse(findData.body ? findData.body : ''));
  const bodyData = EditorState.createWithContent(DBEditorState);
  const decorator = createLinkDecorator();

  const defaultEditorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(findData.body)),
    decorator,
  );

  const getComments = commentstData.comment.filter(el => el.post_id == router.query.slug);

  const username = findData.user.username;
  const findId = findData.id;

  const getPostData = () => {
    dispatch(PostInit(findData));
  };

  return (
    <>
      <PostPageTap>
        <TopBanner />
        <div className="sticky-wrapper">
          <div className="like-button-wrapper">
            <PostLike
              LikehandleSubmit={LikehandleSubmit}
              isLikeBoolean={isLikeBoolean}
              UnlikehandleSubmit={UnlikehandleSubmit}
            />
          </div>
        </div>
        <div className="sticky-wrapper">
          <div className="card-wrapper">
            <Face
              username={username}
              followHandleSubmit={followHandleSubmit}
              error={error}
              unFollowHandleSubmit={unFollowHandleSubmit}
              unfollowError={unfollowError}
              BooleanIsFollowing={BooleanIsFollowing}
            />
          </div>
        </div>
        <div className="post-wrapper">
          <Title> {capitalize(findData.title)}</Title>
          <div className="tag">{findData.tag}</div>
          <div className="dataFormat">
            {moment(findData.created_at).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="intro-wrapper">
            <Editor editorState={defaultEditorState} readonly customStyleMap={styleMap} />
          </div>
        </div>
        <div className="comments-wrapper">
          <div className="comments-text-wrapper">
            <div className="comments-count">{getComments.length} 개의 댓글</div>
            <div className="comments-edit">
              <Link href="/write">
                <div onClick={getPostData}>
                  <a>수정</a>
                </div>
              </Link>
              <Link href="/">
                <div onClick={() =>DeletePostSubmit(findData.id)}>삭제</div>
              </Link>
            </div>
          </div>
          <CommentForm
            findId={findId}
            handleSubmit={handleSubmit}
            getText={getText}
            textOnChange={textOnChange}
          />
          {getComments.map(el => (
            <>
              {el.reply ? (
                ''
              ) : (
                <>
                  <div className="comments-layout" key={el.id}>
                    <div>User {el.user?.username}</div>
                    <div className="comments-text">{el.text}</div>
                    <div
                      onClick={() => {
                        setIsopen(el.id);
                        toggle(!on);
                      }}>
                      <div className="comment-write-button">
                        <IoIosAddCircleOutline /> 댓글 작성
                      </div>
                    </div>
                  </div>
                  <RiArrowDropDownLine />
                </>
              )}

              {el.id == isOpen && on ? (
                <>
                  <form onSubmit={e => subHandleSubmit(e, findData.id)}>
                    <input
                      className="commentsInput"
                      placeholder="댓글을 입력하세요"
                      name="text"
                      value={getSubText}
                      type="text"
                      onChange={subTextOnChange}
                    />
                    <div className="button-flex">
                      <Buttons color="blue" size={24} iconBefore="edit">
                        댓글 작성
                      </Buttons>
                    </div>
                  </form>
                </>
              ) : (
                ''
              )}

              {el.replies.map(ele => (
                <div className="subcomments-wrapper">
                  <SubComments>
                    {ele.user?.username}
                    {ele.text}
                  </SubComments>
                </div>
              ))}
            </>
          ))}
        </div>
      </PostPageTap>
    </>
  );
}

export default PostPage;
