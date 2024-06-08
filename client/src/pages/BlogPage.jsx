// src/components/BlogPage.js
import React, { useState } from 'react';

export default function BlogPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Blog Post',
      content: 'This is the content of the first blog post.',
      author: 'Author One',
    },
    {
      id: 2,
      title: 'Second Blog Post',
      content: 'This is the content of the second blog post.',
      author: 'Author Two',
    },
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostWithId = { ...newPost, id: posts.length + 1 };
    setPosts([...posts, newPostWithId]);
    setNewPost({ title: '', content: '', author: '' });
  };

  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className='mb-8 p-4 border rounded-lg shadow'>
          <h2 className='text-2xl font-semibold text-slate-800'>{post.title}</h2>
          <p className='mt-2 text-slate-700'>{post.content}</p>
          <p className='mt-2 text-sm text-slate-500'>
            <strong>Author:</strong> {post.author}
          </p>
        </div>
      ))}
      <h2 className='text-2xl font-bold mb-4 text-slate-800'>Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className='p-4 border rounded-lg shadow'>
        <div className='mb-4'>
          <label className='block text-slate-700'>Title</label>
          <input
            type='text'
            name='title'
            value={newPost.title}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-slate-700'>Content</label>
          <textarea
            name='content'
            value={newPost.content}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
          ></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-slate-700'>Author</label>
          <input
            type='text'
            name='author'
            value={newPost.author}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
          />
        </div>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Create
        </button>
      </form>
    </div>
  );
}

