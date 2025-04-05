import React from 'react';
import PostForm from '../components/createposts/PostForm';

const Post = () => {
  return (
    <div className="min-h-screen bg-pink-100 py-12 px-10 flex justify-center items-start">
      <div > 
        <PostForm />
      </div>
    </div>
  );
};

export default Post;
