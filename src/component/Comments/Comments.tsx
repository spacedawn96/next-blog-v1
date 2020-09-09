import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import useGetUser from '../TopBanner.tsx/hooks/useGetUser';

const CommentsTap = styled.div``;

export type CommentsProps = {
  el: any;
  editComment;
  editText;
  editCommentInput;
  setIsopen;
  toggle;
  on;
  EditCommentSubmit;
  fixComment;
  DeleteCommentSubmit;
  userData;
};

function Comments(props: CommentsProps) {
  const [editComment, setEditComment] = useState(false);
  const [editSubComment, setEditSubComment] = useState(false);
  const [editText, setEditText] = useState('');
  const [subEditText, subSetEditText] = useState('');

  const editCommentInput = e => {
    setEditText(e.target.value);
  };

  const editSubCommentInput = e => {
    subSetEditText(e.target.value);
  };

  const fixComment = () => {
    setEditComment(!editComment);
  };

  const fixSubComment = () => {
    setEditSubComment(!editSubComment);
  };

  console.log(props.el.user.id);
  return (
    <>
      {props.el.reply ? (
        ''
      ) : (
        <div>
          <div className="comments-layout">
            <div>User {props.el.user?.username}</div>
            <div className="comments-text">
              {editComment ? (
                <input
                  name="text"
                  value={props.editText}
                  onChange={props.editCommentInput}
                  type="text"
                />
              ) : (
                props.el.text
              )}
            </div>

            <div className="comment-write-button">
              <div className="edit-button">
                <IoIosAddCircleOutline
                  onClick={() => {
                    props.setIsopen(props.el.id);
                    props.toggle(!props.on);
                  }}
                />
                <div
                  onClick={() => {
                    props.setIsopen(props.el.id);
                    props.toggle(!props.on);
                  }}>
                  댓글 작성
                </div>
              </div>

              {props.userData?.me?.id == props.el.user.id ? (
                <div className="edit-button">
                  {editComment ? (
                    <>
                      <div
                        onClick={e => {
                          props.EditCommentSubmit(e, props.el.id, props.editText);
                          fixComment();
                        }}>
                        수정
                      </div>
                      <div>취소</div>
                    </>
                  ) : (
                    <div className="edit-button">
                      <div
                        onClick={() => {
                          fixComment();
                        }}>
                        수정
                      </div>
                      <div onClick={e => props.DeleteCommentSubmit(e, props.el.id)}>
                        삭제
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <RiArrowDropDownLine />
        </div>
      )}
    </>
  );
}

export default Comments;
