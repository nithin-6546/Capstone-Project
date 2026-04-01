import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthStore/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const onLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // Ensure withCredentials is true to send the token/cookie
      const res = await axios.get("http://localhost:3000/user-api/users", { withCredentials: true });
      setArticles(res.data.payload || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleReadMore = (article) => {
    // Pass the populated article object to the details page
    navigate(`/article/${article._id}`, { state: { article } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className='flex justify-between items-center bg-white shadow-md p-4 px-10 sticky top-0 z-50'>
        <h2 className='font-bold text-2xl text-blue-600 cursor-pointer' onClick={() => navigate('/')}>BlogApp</h2>
        <div className='flex items-center gap-5'>
          <span className='font-semibold text-gray-700 hidden md:block'>
            Welcome, {currentUser?.firstName}
          </span>
          {currentUser?.profileImageUrl && (
            <img src={currentUser.profileImageUrl} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" />
          )}
          <button onClick={onLogout} className='bg-red-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-600 transition-all'>
            Logout
          </button>
        </div>
      </nav>

      <div className='max-w-7xl mx-auto p-10'>
        <h2 className='font-bold text-3xl mb-8 text-gray-800 border-l-4 border-blue-500 pl-4'>Latest Stories</h2>
        
        {loading ? (
          <div className="flex justify-center mt-20"><div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6 flex-grow">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{article.category}</span>
                  <h3 className="font-bold text-xl mt-2 mb-3 line-clamp-2 text-gray-900">{article.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{article.content}</p>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img 
                      src={article.author?.profileImageUrl || "https://ui-avatars.com/api/?name=" + article.author?.firstName} 
                      className="w-6 h-6 rounded-full object-cover" 
                      alt="author" 
                    />
                    <span className="text-xs font-semibold text-gray-700">
                      By {article.author?.firstName} {article.author?.lastName}
                    </span>
                  </div>
                  <button onClick={() => handleReadMore(article)} className="text-blue-600 text-xs font-bold hover:text-blue-800 underline">
                    Read Full Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;