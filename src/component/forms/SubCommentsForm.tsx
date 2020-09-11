import React, { useState } from 'react';
import styled from 'styled-components';
import Buttons from 'src/component/common/Button';
const SubCommentsFormTap = styled.div``;

export type SubCommentsFormProps = {
  userData;
  subHandleSubmit;
  findData;
  onClickNotify;
  isOpen;
  on;
  toggle;
};

function SubCommentsForm(props: SubCommentsFormProps) {
  const [SubText, setSubText] = useState('');

  const subTextOnChange = e => {
    setSubText(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={e => {
          props.userData.me
            ? props.subHandleSubmit(e, props.findData.id, SubText)
            : props.onClickNotify(e);
          props.userData.me ? setSubText('') : '';
        }}>
        <input
          className="commentsInput"
          placeholder="댓글을 입력하세요"
          name="text"
          value={SubText}
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
  );
}

export default SubCommentsForm;
