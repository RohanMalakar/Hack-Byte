import React, { useEffect, useState } from 'react';
import PostCard from '../components/createposts/PostCard';
import axiosInstance from '../helper/axiosinstance';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const response = await axiosInstance.get('/post/allPosts');
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Community Posts
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-gray-500 text-center">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;

