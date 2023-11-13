// TextEditor.js

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the styles

const TextEditor = () => {
  const handleChange = (content, delta, source, editor) => {
  };

  return (
    <ReactQuill
      onChange={handleChange}
      placeholder="Write your blog content..."
      modules={{
        toolbar: [
          [{ 'header': [1, 2, 3 , 4 , 5 , 6 , false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
      ]}
    />
  );
};

export default TextEditor;