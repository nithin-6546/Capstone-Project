import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthStore/useAuth";

function Home() {
  const navigate = useNavigate();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);

  const handleDashboard = () => {
    if (currentUser?.role === "AUTHOR") {
      navigate("/author-profile");
    } else {
      navigate("/user-profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Write. Read. Connect.
        </h1>

        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Share your ideas and discover meaningful stories from writers around the world.
        </p>

        {isAuthenticated ? (
          <button
            onClick={handleDashboard}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        ) : (
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Sign In
            </button>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-xl font-bold mb-3">Easy Writing</h3>
            <p className="text-gray-600">
              Create and manage your articles with a simple dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-xl font-bold mb-3">Secure Access</h3>
            <p className="text-gray-600">
              Authentication and protected routes keep your account safe.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="text-xl font-bold mb-3">Community</h3>
            <p className="text-gray-600">
              Read blogs, comment, and connect with other users.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;