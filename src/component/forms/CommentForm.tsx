import React, { useState } from 'react';
import styled from 'styled-components';
import Buttons from '../common/Button';
import media from 'src/styles/media';
import { checkEmpty } from 'src/utils/isNull';

const CommentFormTap = styled.div`
  ${media.custom(400)} {
    width: 90%;
  }
  width: 100%;
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
    test: string,
  ) => void;
  getText: string;
  textOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  findId: React.FormEvent<HTMLFormElement>;
  userData;
  onClickNotify;
  onClickNotifyCheckString
};

function CommentForm(props: CommentFormProps) {
  const [Text, setText] = useState('');

  const textOnChange = e => {
    setText(e.target.value);
  };

  return (
    <CommentFormTap>
      
      <form
        onSubmit={e => {
          props.userData.me
            ? e.preventDefault()
            : props.onClickNotify(e);
            checkEmpty(Text) ?  props.onClickNotifyCheckString(e): props.handleSubmit(e, props.findId, Text)
          props.userData.me ? setText('') : '';
        }}>
        <input
          className="commentsInput"
          placeholder="댓글을 입력하세요"
          name="text"
          value={Text}
          type="text"
          onChange={textOnChange}
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
