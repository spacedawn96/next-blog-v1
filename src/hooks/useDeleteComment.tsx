import { useMutation } from '@apollo/client';
import { Create_Comment, Get_Comment, Remove_Comment } from 'src/graphql/post';
import { useState } from 'react';

export default function useDeleteComment() {
  const [deleteComment, { error }] = useMutation(Remove_Comment);
  const DeleteCommentSubmit = async (e, commentId) => {
    e.preventDefault();

    console.log(commentId);
    deleteComment({
      variables: {
        id: commentId,
      },
      update: (proxy, { data: deleteComment }) => {
        const data = proxy.readQuery({
          query: Get_Comment,
        });

        console.log(data);

        proxy.writeQuery({
          query: Get_Comment,
          data: {
            ...data,
            comment: [...data.comment.filter(el => el.id !== commentId)],
          },
        });
      },
    });
  };

  return { DeleteCommentSubmit };
}
