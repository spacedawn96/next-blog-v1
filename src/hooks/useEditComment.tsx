import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Edit_Comment, Get_Comment } from 'src/graphql/post';

export default function useEditComment() {
  const [editComment, { error }] = useMutation(Edit_Comment);
  const EditCommentSubmit = async (e, commentId, text) => {
    e.preventDefault();

    console.log(commentId);
    console.log(text);
    editComment({
      variables: {
        id: commentId,
        text: text,
      },

      update: (proxy, { data: editComment }) => {
        const data = proxy.readQuery({
          query: Get_Comment,
        });

        const findData = data.comment.find(el => el.id == commentId);
        const findIndex = data.comment.indexOf(findData);

        const findSubData = data.comment[findIndex].replies.find(
          el => el.id == commentId,
        );

        proxy.writeQuery({
          query: Get_Comment,
          data: {
            ...data,
            comment: [findData == editComment.editComment],
          },
        });
      },
    });
  };

  return { EditCommentSubmit };
}
