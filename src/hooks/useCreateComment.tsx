import { useMutation } from '@apollo/client';
import { Create_Comment, Get_Comment } from 'src/graphql/post';
import { useState } from 'react';

export default function useCreateComment() {
  const [getText, setText] = useState('');
  const [getSubText, setSubText] = useState('');
  const [isOpen, setIsopen] = useState('');

  const textOnChange = e => {
    setText(e.target.value);
  };

  const subTextOnChange = e => {
    setSubText(e.target.value);
  };

  const [createComment] = useMutation(Create_Comment);

  const handleSubmit = async (e, findId) => {
    e.preventDefault();

    createComment({
      variables: {
        post_id: findId,
        text: getText,
      },
      update: (proxy, { data: createComment }) => {
        const data = proxy.readQuery({
          query: Get_Comment,
        });

        console.log(data);

        proxy.writeQuery({
          query: Get_Comment,
          data: {
            ...(data as any),
            comment: [createComment.createComment, ...data.comment],
          },
        });
      },
    });
  };

  const subHandleSubmit = async (e, findId) => {
    e.preventDefault();

    createComment({
      variables: {
        post_id: findId,
        text: getSubText,
        comment_id: isOpen,
      },

      update: async (proxy, { data: createComment }) => {
        const data = proxy.readQuery({
          query: Get_Comment,
        });

        const findData = data.comment.filter(el => el.id == isOpen);

        proxy.writeQuery({
          query: Get_Comment,
          data: {
            ...data,
            comment: [createComment.createComment, ...findData[0].replies],
          },
        });
      },
    });
  };

  return {
    textOnChange,
    subTextOnChange,
    handleSubmit,
    subHandleSubmit,
    getText,
    getSubText,
    isOpen,
    setIsopen,
  };
}
