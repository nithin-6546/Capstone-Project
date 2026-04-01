// --- AddArticle.jsx ---
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthStore/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function AddArticle() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const onArticleSubmit = async (articleObj) => {
    setIsSubmitting(true);

    try {
      // We only send content; backend gets author ID from the cookie/token
      const res = await axios.post("http://localhost:3000/author-api/articles", articleObj, { 
        withCredentials: true 
      });

      if (res.status === 201) {
        toast.success("Article Published!");
        navigate("/author-profile");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to create article";
      toast.error(errorMsg);
      if (errorMsg.includes("Unauthorized")) navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">New Story</h2>
        <form onSubmit={handleSubmit(onArticleSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
            <input type="text" {...register("title", { required: "Title is required" })} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <select {...register("category", { required: "Category is required" })} className="w-full p-3 bg-gray-50 border rounded-lg outline-none">
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="AI & ML">AI & ML</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Content</label>
            <textarea {...register("content", { required: "Content is required" })} rows="8" className="w-full p-3 bg-gray-50 border rounded-lg outline-none resize-none"></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
            {isSubmitting ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;