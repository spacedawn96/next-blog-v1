import React, { useState } from 'react';
import styled from 'styled-components';
import EditorMain from 'src/component/Editor/TextEditor';

const WriteTap = styled.div``;

export type WriteProps = {};

function Write(props: WriteProps) {
  return (
    <>
      <EditorMain />
    </>
  );
}

export default Write;
