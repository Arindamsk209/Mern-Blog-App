import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor"; // Make sure this imports correctly
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files) {
      data.set('file', files[0]);
    }

    const response = await fetch('https://mern-blog-app-backend-tgj1.onrender.com/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      const errorData = await response.json();
      console.error("Error creating post:", errorData);
      // Optionally show an error message to the user
    }
  }

  if (redirect) {
    return <Navigate to='/' />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input 
        type="text" 
        placeholder='Title' 
        value={title} 
        onChange={ev => setTitle(ev.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder='Summary' 
        value={summary} 
        onChange={ev => setSummary(ev.target.value)} 
        required 
      />
      <input 
        type="file" 
        onChange={ev => setFiles(ev.target.files)} 
        accept="image/*" // Optional: restrict to image files
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
}
