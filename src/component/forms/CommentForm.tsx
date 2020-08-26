import React from 'react';
import styled from 'styled-components';
import Buttons from '../common/Button';

const CommentFormTap = styled.div`
  .button-flex {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export type CommentFormProps = {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    findId: React.FormEvent<HTMLFormElement>,
  ) => void;
  getText: string;
  textOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  findId: React.FormEvent<HTMLFormElement>;
};

function CommentForm(props: CommentFormProps) {
  return (
    <CommentFormTap>
      <form onSubmit={e => props.handleSubmit(e, props.findId)}>
        <input
          className="commentsInput"
          placeholder="댓글을 입력하세요"
          name="text"
          value={props.getText}
          type="text"
          onChange={props.textOnChange}
        />
        <div className="button-flex">
          <Buttons color="blue" size={24} iconBefore="edit">
            댓글 작성
          </Buttons>
        </div>
      </form>
    </CommentFormTap>
  );
}

export default CommentForm;
