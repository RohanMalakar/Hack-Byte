import React, { useEffect, useState } from 'react';
import { Heart, HeartOff, MapPin } from 'lucide-react';
import axiosInstance from '../../helper/axiosinstance';
import { useLocation } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [currentImg, setCurrentImg] = useState(0);

  const location = useLocation();
  const isNgoDashboard = location.pathname === '/ngo-dashboard';
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    getLikesCount();
    if (userType !== "ngo") {
      checkIfLiked();
    }
  }, [post._id]);

  async function getLikesCount() {
    try {
      const response = await axiosInstance.get(`/like/getlikescount/${post._id}`);
      setLikesCount(response.data.data);
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  }

  async function checkIfLiked() {
    try {
      const response = await axiosInstance.get(`/like/isliked/${post._id}`);
      setLiked(response.data.data === true);
    } catch (error) {
      console.error('Error checking if liked:', error);
    }
  }

  const toggleLike = async () => {
    try {
      const res = await axiosInstance.post('/like/togglelike', {
        post_id: post._id,
      });

      if (res.data.success) {
        const isNowLiked = !liked;
        setLiked(isNowLiked);
        setLikesCount((prev) => (isNowLiked ? prev + 1 : prev - 1));
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleNext = () => {
    setCurrentImg((prev) => (prev + 1) % post.media.length);
  };

  const handlePrev = () => {
    setCurrentImg((prev) => (prev - 1 + post.media.length) % post.media.length);
  };

  const handleAccept = async () => {
    try {
      const response = await axiosInstance.post(`/ngo/accept`, {
        postId: post._id,
      });
      alert('Accepted successfully!');
    } catch (err) {
      console.error('Error accepting post:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 max-w-md w-full transition hover:shadow-xl">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        {userType !== "ngo" && (
          <button onClick={toggleLike} className="flex items-center gap-1">
            {liked ? <Heart className="text-red-500" /> : <HeartOff className="text-gray-400" />}
            <span className="text-sm text-gray-500">{likesCount}</span>
          </button>
        )}
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-2">
        <MapPin className="w-4 h-4 mr-1" /> Gwalior, India
      </div>

      {post.media?.length > 0 && (
        <div className="relative mb-3 aspect-square w-full">
          <img
            src={post.media[currentImg]}
            alt="post media"
            className="w-full h-full object-cover rounded-xl"
          />
          {post.media.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      <p className="text-sm text-gray-700 truncate">{post.description}</p>

      <div className="mt-2 text-xs text-gray-400">
        Status: <span className="capitalize">{post.status}</span>
      </div>

      {isNgoDashboard && (
        <button
          onClick={handleAccept}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Accept
        </button>
      )}
    </div>
  );
};

export default PostCard;
