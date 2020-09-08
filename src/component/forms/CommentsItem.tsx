import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Buttons from 'src/component/common/Button';
import useForms from '../common/useForm';

const CommentsItemTap = styled.div`
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
  .comments-text {
    padding-top: 1rem;
  }

  .comment-write-button {
    display: flex;
    justify-content: space-between;
    color: rgb(134, 142, 150);
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

  .button-flex {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 1rem;
  }

  .subcomments-wrapper {
    margin: 0.5rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
  }

  .comments-edit-wrapper {
    display: flex;
    justify-content: flex-end;

    & div {
      margin-right: 0.4rem;
    }
  }
  .edit-button {
    display: flex;
    & div {
      margin-right: 0.4rem;
    }
  }
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

  .sub-color {
    color: rgb(134, 142, 150);
  }
`;

export type CommentsItemProps = {
  el: any;
  ele: any;
  isInput: boolean;
  getSubText: string;
  subTextOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  on: boolean;
  setisInput: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: string;
  subHandleSubmit: (e: React.FormEvent<HTMLFormElement>, findId: any) => Promise<void>;
  findData: any;
  EditCommentSubmit: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    commentId: any,
    text: string,
  ) => Promise<void>;
  findId: React.Dispatch<React.SetStateAction<boolean>>;
  setIsopen: React.Dispatch<React.SetStateAction<string>>;
  DeleteCommentSubmit: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    commentId: string,
  ) => Promise<void>;
};

function CommentsItem(props: CommentsItemProps) {
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

  return (
    <CommentsItemTap>
      {props.ele.reply ? (
        ''
      ) : (
        <>
          <div className="comments-layout" key={props.el.id}>
            <div>User {props.el.user?.username}</div>
            <div className="comments-text">
              {editComment ? (
                <input
                  name="text"
                  value={editText}
                  onChange={editCommentInput}
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

              <div className="edit-button">
                {editComment ? (
                  <>
                    <div
                      onClick={e => {
                        props.EditCommentSubmit(e, props.el.id, editText);
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
            </div>
          </div>
          <RiArrowDropDownLine />
        </>
      )}

      {props.el.id == props.isOpen && props.on ? (
        <>
          <form onSubmit={e => props.subHandleSubmit(e, props.findData.id)}>
            <input
              className="commentsInput"
              placeholder="댓글을 입력하세요"
              name="text"
              value={props.getSubText}
              type="text"
              onChange={props.subTextOnChange}
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
    </CommentsItemTap>
  );
}

export default CommentsItem;
// {props.el.reply ? (
//   <div className="subcomments-wrapper">
//     <SubComments>
//       <div> User {props.el.user?.username} </div>
//       {editSubComment ? (
//         <>
//           <input
//             name="text"
//             value={subEditText}
//             onChange={editSubCommentInput}
//             type="text"
//           />
//           <div className="comments-edit-wrapper">
//             <div
//               onClick={e => {
//                 props.EditCommentSubmit(e, props.el.id, subEditText);
//                 fixSubComment();
//               }}
//               className="sub-color">
//               수정
//             </div>
//             <div className="sub-color">취소</div>
//           </div>
//         </>
//       ) : (
//         <>
//           {props.el.text}
//           <div className="comments-edit-wrapper">
//             <div onClick={fixSubComment} className="sub-color">
//               수정
//             </div>
//             <div
//               className="sub-color"
//               onClick={e => props.DeleteCommentSubmit(e, props.el.id)}>
//               삭제
//             </div>
//           </div>
//         </>
//       )}
//     </SubComments>
//   </div>
// ) : (
//   ''
// )}
