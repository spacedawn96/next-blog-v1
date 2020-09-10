import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { capitalize } from 'src/utils/capitalize';
import media from 'src/styles/media';
import Moment from 'react-moment';
import './index.module.css';
const PostCardTap = styled.div<{
  large: boolean;
  thumbnail: string;
}>`
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
  .post-wrapper {
    width: ${props => (props.large ? '450px' : '320px')};
    margin: 0 auto;
    height: ${props => (props.large ? '400px' : '300px')};
    padding-bottom: 3rem;
    border-radius: 8px;
    box-shadow: 0px 10px 20px rgba(10, 33, 65, 0.05), 0px 0px 2px rgba(0, 0, 0, 0.13);
    margin-top: 2.5rem;
    background: #fff;
    transition: all 0.5s ease;
    border-bottom-left-radius: 0;

    &: hover {
      box-shadow: 0 5px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-10px);
      cursor: pointer;
      opacity: 1;
    }
    ${media.custom(370)} {
      width: ${props => (props.large ? '450px' : '270px')};
    }
    ${media.custom(570)} {
      width: ${props => (props.large ? '320px' : '270px')};
      height: ${props => (props.large ? '320px' : '270px')};
    }
    ${media.custom(420)} {
      width: ${props => (props.large ? '250px' : '270px')};
      height: ${props => (props.large ? '320px' : '270px')};
    }
  }

  .img {
    height: 250px;
    width: 450px;
  }
  .tag {
    position: absolute;
  }
  .intro-wrapper {
    display: flex;
  }
  .withoutImg {
    background: #fff;
    height: ${props => (props.thumbnail ? '150x' : '300px')};
    padding: 1rem;
  }
  .smallImg {
    width: 320px;
    height: 200px;
  }
  h4 {
    font-size: 1rem;
    line-height: 1.5;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: hidden;
    color: rgb(33, 37, 41);
    margin: 0px 0px 0.25rem;
    font-weight: bold;
  }
  .timeFormat {
    font-size: 0.75rem;
    line-height: 1.5;
    color: rgb(134, 142, 150);
    display: flex;
  }

  .madeBy {
    font-size: 0.75rem;
    line-height: 1.5;
    color: rgb(134, 142, 150);
  }

  .username {
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const Body = styled.div`
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgb(73, 80, 87);
  margin: 0px 0px 1.5rem;
`;
type userType = {
  id: string;
  username: string;
};

export type PostCardProps = {
  id?: string;
  tag?: string;
  name?: string;
  date?: string;
  title?: string;
  body?: string;
  large?: boolean;
  thumbnail?: string;
  user: userType;
  created_at: Date;
  views: number;
  comments: string[];
  isBig?: boolean;
  isSmall: boolean;
};

function PostCard(props: PostCardProps) {
  const bodyData = JSON.parse(props.body).blocks.map(el => el.text);

  return (
    <Link href={`/blog/${props.id}`} as={`/blog/${props.id}`}>
      <PostCardTap large={props.large} thumbnail={props.thumbnail}>
        <div className="post-wrapper">
          <div>
            <div className="tag">{props.tag}</div>
            {props.thumbnail ? (
              props.isBig ? (
                <div className="flt-card-head">
                  <img src={props.thumbnail} className="img" />
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            {props.thumbnail ? (
              props.isSmall ? (
                <img src={props.thumbnail} className="smallImg" />
              ) : (
                ''
              )
            ) : (
              ''
            )}
            <div className="withoutImg">
              <div className="intro-wrapper">
                <div>{props.name}</div>
                <div>{props.date}</div>
              </div>
              <h4>{capitalize(props.title)}</h4>
              <Body>{bodyData}</Body>
              <div className="timeFormat">
                <Moment fromNow>{props.created_at}</Moment>
                {/* <div>{props.views}</div> */}&nbsp;&nbsp;
                <div> {props.comments.length}개의 댓글</div>
              </div>
              <br />
              <div className="made-by">
                <span className="madeBy"> MadeBy </span>
                <span className="username"> {props.user.username}</span>
              </div>
            </div>
          </div>
        </div>
      </PostCardTap>
    </Link>
  );
}

export default PostCard;
