import { useMutation } from '@apollo/client';
import {
  Create_Post,
  GET_Posts,
  Get_TopPost,
  UPLOAD_IMAGE_TO_CLOUDINARY,
} from 'src/graphql/post';
import { useState } from 'react';
import {
  EditorState,

  convertToRaw,

  convertFromRaw,
} from 'draft-js';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';

export default function useEditor() {
  const getPosts = useSelector((state: RootState) => state.post.post);
  const initialData = {
    blocks: [
      {
        key: '16d0k',
        text: 'You can edit this text.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [{ offset: 0, length: 23, style: 'unstyled' }],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  const [createPost, ] = useMutation(Create_Post);
  const [uploadThumbnail] = useMutation(
    UPLOAD_IMAGE_TO_CLOUDINARY,
  );
  const [inputs, setInputs] = useState(getPosts.title ? getPosts.title : '');
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [tag, setTag] = useState([]);
  const [url, setUrl] = useState('');

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw(getPosts.body ? JSON.parse(getPosts.body) : initialData),
    ),
  );

  const router = useRouter();

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
    setFileInputState(e.target.value);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await uploadThumbnail({
        variables: {
          body: reader.result,
        },
        update: (_proxy, { data: newData }) => {
          console.log(newData.uploadImage.url);
          setUrl(newData.uploadImage.url);
        },
      });
    };
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as any);
    };
  };

  const titleOnChange = e => {
    setInputs(e.target.value);
  };

  const stringData = tag.reduce((result, item) => {
    return `${result}${item.text} `;
  }, '');

  const handleSubmit = async e => {
    e.preventDefault();

    createPost({
      variables: {
        title: inputs,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        thumbnail: url,
        tags: stringData,
      },
      update: async (proxy) => {
        const data = proxy.readQuery({
          query: GET_Posts,
        });

        const data2 = proxy.readQuery({
          query: Get_TopPost,
        });

        console.log(data2);
        proxy.writeQuery({
          query: Get_TopPost,
          data: {
            ...data2,
            topFivePost: [createPost.createPost, ...data2?.topFivePost],
          },
        });
        proxy.writeQuery({
          query: GET_Posts,
          data: {
            ...data,
            posts: [createPost.createPost, ...data.posts],
          },
        });
      },
    });

    router.push('/');
  };

  return {
    handleSubmit,
    inputs,
    editorState,
    setEditorState,
    titleOnChange,
    handleFileInputChange,
    previewSource,
    fileInputState,
    tag,
    setTag,
  };
}
