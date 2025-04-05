import React, { useEffect, useState } from 'react';
import axiosInstance from "../helper/axiosinstance";
import PostCard from '../components/createposts/PostCard';

const NgoDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ngoId, setNgoId] = useState(null);

  const getNgoData = async () => {
    try {
      const response = await axiosInstance.get('/ngo/profile');
      const ngoData = response.data.data;
      setNgoId(ngoData.ngo_id);
    } catch (err) {
      console.error('Error fetching NGO data:', err);
    }
  };

  const fetchTaggedPosts = async (id) => {
    try {
      const response = await axiosInstance.post('/tag/get_tagged_post', { ngo_id: id });
      const postIds = response.data.data;

      const postDetails = await Promise.all(
        postIds.map((id) => axiosInstance.get(`/post/singlepost/${id}`))
      );

      const fullPosts = postDetails.map((res) => res.data.data);
      setPosts(fullPosts);
    } catch (err) {
      console.error('Error fetching tagged posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNgoData();
  }, []);

  useEffect(() => {
    if (ngoId) {
      fetchTaggedPosts(ngoId);
    }
  }, [ngoId]);

  if (loading) return <div className="text-center text-gray-600">Loading tagged posts...</div>;

  return (
    <div className="flex flex-col items-center gap-6 py-6 px-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} ngoId={ngoId} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No tagged posts available.</p>
      )}
    </div>
  );
};

export default NgoDashboard;
