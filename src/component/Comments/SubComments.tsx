import React, { useState } from 'react';
import styled from 'styled-components';

const SubCommentsTap = styled.div`
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

  .sub-color {
    color: rgb(134, 142, 150);
  }
`;

export type SubCommentsProps = {
  ele;
  el;
  subEditText;
  editSubCommentInput;
  EditCommentSubmit;
  DeleteCommentSubmit;
  userData;
  findData;
};

function SubComments(props: SubCommentsProps) {
  const [editSubComment, setEditSubComment] = useState(false);

  const fixSubComment = () => {
    setEditSubComment(!editSubComment);
  };

  return (
    <>
      <div>
        {props.ele.reply && props.el.id == props.ele.reply ? (
          <div className="subcomments-wrapper">
            <SubCommentsTap>
              <div> User {props.ele.user?.username} </div>
              {editSubComment ? (
                <>
                  <input
                    name="text"
                    value={props.subEditText}
                    onChange={props.editSubCommentInput}
                    type="text"
                  />

                  <div className="comments-edit-wrapper">
                    <div
                      onClick={e => {
                        props.EditCommentSubmit(e, props.ele.id, props.subEditText);
                        fixSubComment();
                      }}
                      className="sub-color">
                      수정
                    </div>
                    <div className="sub-color">취소</div>
                  </div>
                </>
              ) : (
                <>
                  {props.ele.text}

                  {props.userData?.me?.id == props.ele.user.id ? (
                    <div className="comments-edit-wrapper">
                      <div onClick={fixSubComment} className="sub-color">
                        수정
                      </div>
                      <div
                        className="sub-color"
                        onClick={e => props.DeleteCommentSubmit(e, props.ele.id)}>
                        삭제
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}
            </SubCommentsTap>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default SubComments;
