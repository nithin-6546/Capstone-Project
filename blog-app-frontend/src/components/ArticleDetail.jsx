import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function ArticleDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.currentUser);
  
  // Initialize state with the article passed from the list
  const [article, setArticle] = useState(state?.article);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!article) return <div className="p-20 text-center">Loading Article...</div>;

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const commentBody = {
        user: currentUser._id || currentUser.id, // User ID from Auth Store
        articleId: article._id,
        comment: commentText
      };

      const res = await axios.post("http://localhost:3000/user-api/articles", commentBody, { 
        withCredentials: true 
      });

      // Update local state with the new payload (which includes the new comment)
      setArticle(res.data.payload);
      setCommentText("");
      toast.success("Comment posted");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header Navigation */}
        <button onClick={() => navigate(-1)} className="mb-6 hover:opacity-60 transition-opacity">
          <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Article Body */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={article.author?.profileImageUrl || `https://ui-avatars.com/api/?name=${article.author?.firstName}`} 
              className="w-10 h-10 rounded-full object-cover border" 
              alt="author" 
            />
            <span className="font-bold text-sm">{article.author?.firstName} {article.author?.lastName}</span>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap border-b pb-10">
            {article.content}
          </p>
        </div>

        {/* Instagram Style Comment Section */}
        <div className="mt-8">
          <h2 className="font-bold text-md mb-6">Comments ({article.comments?.length || 0})</h2>
          
          <div className="space-y-5 mb-20">
            {article.comments?.map((c, idx) => (
              <div key={idx} className="flex gap-3 items-start animate-fade-in">
                <img 
                  src={c.user?.profileImageUrl || `https://ui-avatars.com/api/?name=${c.user?.firstName}`} 
                  className="w-8 h-8 rounded-full object-cover shadow-sm"
                  alt="user"
                />
                <div className="text-sm">
                   <p>
                     <span className="font-bold mr-2 hover:underline cursor-pointer">
                        {c.user?.firstName} {c.user?.lastName}
                     </span>
                     <span className="text-gray-700">{c.comment}</span>
                   </p>
                   <span className="text-gray-400 text-[10px] font-bold mt-1 inline-block uppercase">Reply</span>
                </div>
              </div>
            ))}
          </div>

          {/* Persistent Sticky Comment Input (Bottom) */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <img 
                src={currentUser?.profileImageUrl || "https://via.placeholder.com/150"} 
                className="w-8 h-8 rounded-full object-cover" 
                alt="me"
              />
              <form onSubmit={handlePostComment} className="flex-grow flex items-center border rounded-full px-4 py-2 bg-gray-50 focus-within:bg-white transition-colors">
                <input 
                  type="text" 
                  placeholder={`Comment as ${currentUser?.firstName}...`}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                />
                <button 
                  disabled={!commentText.trim() || isSubmitting}
                  className="text-blue-500 font-bold text-sm ml-2 disabled:opacity-30 hover:text-blue-700"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;