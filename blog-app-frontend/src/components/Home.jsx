import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthStore/useAuth';

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);

  const handleStartWriting = () => {
    if (isAuthenticated) {
      navigate(currentUser.role === "AUTHOR" ? "/author-profile" : "/user-profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
          <div className="aspect-square w-[500px] bg-gradient-to-tr from-blue-600 to-purple-400 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
              Write. Read. <br />
              <span className="text-blue-600">Connect.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
              A modern space for thinkers, creators, and readers. Share your stories with a community that cares about depth and quality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleStartWriting}
                className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all hover:shadow-xl active:scale-95"
              >
                Start Writing Today
              </button>
              <button 
                onClick={() => navigate("/user-profile")}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
              >
                Explore Feed
              </button>
            </div>

            {/* Stats / Trust Markers */}
            <div className="mt-16 flex items-center gap-8 border-t border-gray-100 pt-8">
              <div>
                <p className="text-2xl font-black text-gray-900">10k+</p>
                <p className="text-sm text-gray-500 font-medium">Monthly Readers</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <p className="text-2xl font-black text-gray-900">500+</p>
                <p className="text-sm text-gray-500 font-medium">Verified Authors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SECTION */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Why Choose Our Platform?</h2>
              <p className="text-gray-500 mt-2">Built for the next generation of content creators.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Seamless Writing</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our role-based author dashboard lets you focus on what matters: the words. Simple, clean, and distraction-free.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Secure & Private</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                With HTTP-only cookies and role-based authentication, your data and draft privacy are our top priorities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Instant Search</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Discover content across categories and titles instantly with our optimized frontend search capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FINAL CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            {/* Abstract Shape */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 relative z-10">
              Ready to join the <br /> conversation?
            </h2>
            <p className="text-blue-100 mb-10 text-lg relative z-10">
              Sign up today and share your first story in minutes.
            </p>
            <button 
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all transform hover:-translate-y-1 relative z-10"
            >
              Get Started for Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;