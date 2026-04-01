import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthStore/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

function AuthorProfile() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Auth Guard: If we know for sure they aren't logged in, redirect
    if (isAuthenticated === false) {
      setLoading(false);
      navigate("/login");
      return;
    }

    const fetchArticles = async () => {
      // 2. Wait for currentUser to load from the Store
      const userId = currentUser?._id || currentUser?.id;
      
      if (!userId) {
        // If after 3 seconds we still have no user, stop the spinner
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/author-api/articles/${userId}`,
          { withCredentials: true }
        );

        if (res.data && res.data.payload) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentUser, isAuthenticated, navigate]);

  // --- UI RENDER LOGIC ---

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="h-16 w-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
        <p className="mt-4 text-gray-600 font-semibold animate-pulse">Loading Workspace...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">Session data missing. Please log in again.</p>
        <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Workspace</h1>
          <p className="text-gray-500 font-medium italic">
            Welcome, {currentUser?.firstName} {currentUser?.lastName}
          </p>
        </div>
        <button 
          onClick={() => navigate('/add-article')}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
        >
          + New Article
        </button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-4">✍️</div>
          <p className="text-gray-400 text-xl font-medium">Your portfolio is empty.</p>
          <p className="text-gray-400 text-sm">Create your first story to see it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article._id} className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-all group">
              <div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">
                  {article.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mt-5 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed">
                  {article.content}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                 <div className="flex items-center gap-3">
                    <img 
                      src={currentUser?.profileImageUrl || `https://ui-avatars.com/api/?name=${currentUser?.firstName}`} 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" 
                      alt="avatar" 
                    />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">My Article</span>
                 </div>
                 <button 
                   onClick={() => navigate(`/article/${article._id}`, { state: { article } })}
                   className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors"
                 >
                   View Full
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorProfile;