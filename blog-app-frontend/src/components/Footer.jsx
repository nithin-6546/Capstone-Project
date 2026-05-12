import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo / Name */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Blog<span className="text-blue-600">App</span>
          </h2>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 text-sm text-gray-600">
          <a
            href="mailto:mudumalanithin6@gmail.com"
            className="hover:text-blue-600 transition"
          >
            Email
          </a>

          <a
            href="https://github.com/nithin-6546"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition"
          >
            GitHub
          </a>

          <a
            href="#"
            className="hover:text-blue-600 transition"
          >
            Portfolio
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {currentYear} Nithin Mudumala
        </p>
      </div>
    </footer>
  );
}

export default Footer;