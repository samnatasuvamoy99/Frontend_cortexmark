
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Logo } from "../icons/Logo_Landingpage";
import insta_Logo from "../assets/instrgram.png";
import Twitter_Logo from "../assets/Twitter.jpg";
import In_Logo from "../assets/Linkedin-símbolo.png";
import youtube_LOGO from "../assets/youtube.png"

export function LandingPage() {
 


  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
      }`}>

      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${isDarkMode
            ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-900'
            : 'bg-slate-800 hover:bg-slate-700 text-white'
          } shadow-lg hover:shadow-xl`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.button>


      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl transition-colors duration-500 ${isDarkMode
              ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20'
              : 'bg-gradient-to-r from-blue-500/15 to-blue-600/15'
            }`}
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl transition-colors duration-500 ${isDarkMode
              ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20'
              : 'bg-gradient-to-r from-blue-400/15 to-blue-500/15'
            }`}
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className={`absolute top-40 left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl transition-colors duration-500 ${isDarkMode
              ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20'
              : 'bg-gradient-to-r from-blue-300/15 to-blue-400/15'
            }`}
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />


        <motion.div
          className={`absolute top-20 left-20 text-6xl transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'
            }`}
          variants={floatingVariants}
          animate="animate"
        >
          <img className="w-24 h-24" src={insta_Logo} alt="Instagram" />
        </motion.div>
        <motion.div
          className={`absolute top-40 right-32 text-5xl transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'
            }`}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <img className="w-20 h-20" src={Twitter_Logo} alt="Twitter" />
        </motion.div>
        <motion.div
          className={`absolute top-80 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'
            }`}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <img className="w-28 h-18" src={In_Logo} alt="LinkedIn" />
        </motion.div>


        <motion.div
          className={`absolute bottom-20 right-20 text-6xl transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'
            }`}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          🎵
        </motion.div>
        <motion.div
          className={`absolute bottom-60 right-1/1 text-4xl transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'
            }`}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        >
          📄
        </motion.div>
        <motion.div
          className={`absolute bottom-60 right-1/2 text-4xl transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-10'
            }`}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 3 }}
        >
          🔗
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 text-center px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.div
          className="flex justify-center items-center gap-4 mb-8"
          variants={itemVariants}
        >
         

          <motion.div
            className="p-2 rounded-2xl cursor-pointer
             transform transition-transform duration-300
             hover:scale-110 hover:shadow-lg
             dark:hover:shadow-blue-900 hover:shadow-blue-200"
            whileHover={{ rotate: 8 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Logo />
          </motion.div>


          <motion.h1
            className={`text-4xl md:text-6xl font-bold bg-clip-text text-transparent drop-shadow-lg font-orbitron tracking-[0.15em] transition-colors duration-500 ${isDarkMode
                ? 'bg-gradient-to-r from-white via-blue-100 to-indigo-200'
                : 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700'
              }`}
            variants={itemVariants}
          >
            CortexMark
          </motion.h1>
        </motion.div>

        <motion.h2
          className={`text-3xl md:text-5xl font-bold drop-shadow-lg font-orbitron tracking-[0.15em] mb-6 leading-tight transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
            }`}
          variants={itemVariants}
        >
          Bookmark Everything, Browse Nothing
        </motion.h2>

        <motion.p
          className={`text-lg md:text-xl mb-8 font-light max-w-4xl mx-auto leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
            }`}
          variants={itemVariants}
        >
          Don't waste time scrolling through every platform to find your favorite content — bookmark and save videos, tweets, articles, and more effortlessly in one place!
          <span className={`font-semibold transition-colors duration-500 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}> YouTube, Twitter, Instagram, TikTok, Facebook</span> all your favorites, all here.
          <span className={`font-semibold transition-colors duration-500 ${isDarkMode ? 'text-purple-400' : 'text-blue-700'
            }`}> Never open platforms again and again</span> — everything you love is right here.
        </motion.p>


        <motion.div
          className={`backdrop-blur-sm rounded-2xl p-6 mb-12 max-w-4xl mx-auto shadow-xl transition-colors duration-500 ${isDarkMode
              ? 'bg-slate-800/40 border border-slate-600/30'
              : 'bg-white/80 border border-blue-200/50'
            }`}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={`text-2xl font-bold mb-4 text-center transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
            }`}>🔐 Secure & Simple Authentication</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className={`text-center p-4 rounded-xl transition-colors duration-500 ${isDarkMode
                  ? 'bg-slate-700/30 hover:bg-slate-700/50'
                  : 'bg-blue-50/50 hover:bg-blue-100/50'
                }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-3">👤</div>
              <h4 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Quick Signup</h4>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-700'
                }`}>Create account in 30 seconds with username email and password</p>
            </motion.div>
            <motion.div
              className={`text-center p-4 rounded-xl transition-colors duration-500 ${isDarkMode
                  ? 'bg-slate-700/30 hover:bg-slate-700/50'
                  : 'bg-blue-50/50 hover:bg-blue-100/50'
                }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-3">🔑</div>
              <h4 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Secure Login</h4>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-700'
                }`}>JWT-based authentication keeps your data safe</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          <motion.div
            className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 shadow-lg ${isDarkMode
                ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 hover:border-blue-400/50'
                : 'bg-gradient-to-br from-blue-100/50 to-blue-200/50 border border-blue-300/50 hover:border-blue-400/70'
              }`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-5xl mb-4">⏰</div>
            <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>No More Scrolling</h3>
            <p className={`text-lg transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
              }`}>Stop endless browsing. Your bookmarks are organized and ready.</p>
            <div className={`font-semibold text-xl mt-2 transition-colors duration-500 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>Save 1+ hours/day</div>
          </motion.div>
          <motion.div
            className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 shadow-lg ${isDarkMode
                ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50'
                : 'bg-gradient-to-br from-blue-200/50 to-blue-300/50 border border-blue-400/50 hover:border-blue-500/70'
              }`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-5xl mb-4">🔖</div>
            <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>Smart Bookmarks</h3>
            <p className={`text-lg transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
              }`}>Paste link, add caption, categorize - your content is saved forever.</p>
            <div className={`font-semibold text-xl mt-2 transition-colors duration-500 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'
              }`}>One-Click Save</div>
          </motion.div>
          <motion.div
            className={`backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 shadow-lg ${isDarkMode
                ? 'bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 hover:border-cyan-400/50'
                : 'bg-gradient-to-br from-blue-300/50 to-blue-400/50 border border-blue-500/50 hover:border-blue-600/70'
              }`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-5xl mb-4">🚫</div>
            <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
              }`}>All-in-One Platform</h3>
            <p className={`text-lg transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
              }`}>Save your favorite reels, videos, tweets, and more in one place.</p>
            <div className={`font-semibold text-xl mt-2 transition-colors duration-500 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'
              }`}>All-in-One</div>
          </motion.div>
        </motion.div>


        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <h3 className={`text-3xl font-bold mb-4 text-center transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
            }`}>Bookmark from Every Platform</h3>
          <p className={`text-lg text-center mb-8 transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
            }`}>No need to open these apps anymore - save everything here!</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <motion.div
              className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 text-center shadow-lg ${isDarkMode
                  ? 'bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-500/30 hover:border-red-400/50'
                  : 'bg-gradient-to-br from-red-100/50 to-red-200/50 border border-red-300/50 hover:border-red-400/70'
                }`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-3">
                     <img className="w-28 h-24" src={youtube_LOGO} alt="Instagram" />
              </div>
              <p className={`font-bold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>YouTube</p>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-red-300' : 'text-red-600'
                }`}>Videos</p>
            </motion.div>

            <motion.div
              className={`backdrop-blur-md rounded-2xl p-6 shadow-xl text-center transition-colors duration-500 ${isDarkMode
                  ? 'bg-gradient-to-br from-blue-500/30 to-blue-600/40 border border-blue-400/40'
                  : 'bg-gradient-to-br from-blue-100/50 to-blue-200/50 border border-blue-300/50'
                }`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex justify-center mb-3">
                <img className="w-16 h-16 drop-shadow-lg" src={Twitter_Logo} alt="Twitter" />
              </div>
              <p className={`font-semibold text-lg tracking-wide transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Twitter</p>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'
                }`}>Tweets</p>
            </motion.div>

            <motion.div
              className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 text-center shadow-lg ${isDarkMode
                  ? 'bg-gradient-to-br from-pink-600/20 to-pink-700/20 border border-pink-500/30 hover:border-pink-400/50'
                  : 'bg-gradient-to-br from-pink-100/50 to-pink-200/50 border border-pink-300/50 hover:border-pink-400/70'
                }`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-3">
                <img className="w-24  h-24" src={insta_Logo} alt="Instagram" />
              </div>
              <p className={`font-bold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Instagram</p>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-pink-300' : 'text-pink-600'
                }`}>Posts/Reels</p>
            </motion.div>
            <motion.div
              className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 text-center shadow-lg ${isDarkMode
                  ? 'bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-gray-600/30 hover:border-gray-500/50'
                  : 'bg-gradient-to-br from-gray-100/50 to-gray-200/50 border border-gray-300/50 hover:border-gray-400/70'
                }`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-3">🎵</div>
              <p className={`font-bold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>TikTok</p>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Videos</p>
            </motion.div>
            <motion.div
              className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 text-center shadow-lg ${isDarkMode
                  ? 'bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 hover:border-green-400/50'
                  : 'bg-gradient-to-br from-green-100/50 to-green-200/50 border border-green-300/50 hover:border-green-400/70'
                }`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-3">📄</div>
              <p className={`font-bold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Articles</p>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-green-300' : 'text-green-600'
                }`}>News / Document</p>
            </motion.div>
            <motion.div
              className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 text-center shadow-lg ${isDarkMode
                  ? 'bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/30 hover:border-blue-400/50'
                  : 'bg-gradient-to-br from-blue-200/50 to-blue-300/50 border border-blue-400/50 hover:border-blue-500/70'
                }`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-3">🔗</div>
              <p className={`font-bold text-lg transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Any Link</p>
              <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>Everything</p>
            </motion.div>
          </div>
        </motion.div>


        <motion.div
          className={`backdrop-blur-sm rounded-3xl p-8 mb-16 shadow-xl transition-colors duration-500 ${isDarkMode
              ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30'
              : 'bg-gradient-to-br from-blue-100/50 to-blue-200/50 border border-blue-300/50'
            }`}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className={`text-3xl font-bold mb-4 text-center transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
            }`}>How Bookmarking Works</h3>
          <p className={`text-lg text-center mb-8 transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
            }`}>Simple 3-step process to never lose content again</p>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">1</div>
              <h4 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Find & Copy</h4>
              <p className={`transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
                }`}>Find content on any platform and copy the link</p>
              <div className={`mt-4 font-semibold transition-colors duration-500 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>📱 Any Platform</div>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">2</div>
              <h4 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Paste & Describe</h4>
              <p className={`transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
                }`}>Paste link in Second Brain and add your caption</p>
              <div className={`mt-4 font-semibold transition-colors duration-500 ${isDarkMode ? 'text-purple-400' : 'text-blue-600'
                }`}>✍️ Add Notes</div>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-lg">3</div>
              <h4 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Never Open Again</h4>
              <p className={`transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
                }`}>Access all your bookmarks without opening apps</p>
              <div className={`mt-4 font-semibold transition-colors duration-500 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                }`}>🚫 No More Apps</div>
            </motion.div>
          </div>
        </motion.div>


        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => navigate("/signup")}
            className={`group relative px-12 py-6 font-bold rounded-2xl text-xl shadow-2xl overflow-hidden transition-all duration-300 ${isDarkMode
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-blue-500/25'
                : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:shadow-blue-500/25'
              }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10 flex items-center gap-3 text-white">
              <span>Start Bookmarking Now</span>
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDarkMode
                ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700'
                : 'bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900'
              }`}></div>
          </motion.button>

          <motion.button
            onClick={() => navigate("/signin")}
            className={`px-12 py-6 bg-transparent border-2 font-semibold rounded-2xl text-xl transition-all duration-300 backdrop-blur-sm ${isDarkMode
                ? 'border-blue-400/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400'
                : 'border-blue-500/50 text-blue-700 hover:bg-blue-50 hover:border-blue-600'
              }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Sign In
          </motion.button>
        </motion.div>
      
      {/* Download Chrome Extension Section */}
<section className="py-16 bg-gray-50 dark:bg-gray-800 text-center">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-2xl mx-auto px-4"
  >
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
      Get the  CortexMark Chrome Extension
    </h2>
    <p className="text-gray-600 dark:text-gray-400 mb-8">
      Boost your productivity with the Cortex Chrome Extension.  
      Download it instantly and start using it right away!
    </p>

    <motion.a
      href="https://drive.google.com/uc?export=download&id=1kWnfGz8xd0dvqPZd-F6VbaUx8Fk1OWSs"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 150, 255, 0.6)" }}
      whileTap={{ scale: 0.95 }}
      className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      Download CortexMark Extension
    </motion.a>
  </motion.div>
</section>

        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <p className={`text-xl mb-6 font-semibold transition-colors duration-500 ${isDarkMode ? 'text-slate-300' : 'text-blue-800'
            }`}>
            Join thousands of users who stopped wasting time on social media
          </p>
            
         
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      whileHover={{ scale: 1.1, color: "#38bdf8" }}
      className="text-white text-center font-semibold tracking-wide text-lg md:text-xl mt-10 select-none"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      Made by <span className="text-blue-400 font-bold">Suvamoy</span>
    </motion.div>
  


          <div className={`flex justify-center items-center gap-8 text-sm transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-blue-600'
            }`}>
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              ✅ <span className={`transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Free forever</span>
            </motion.span>
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              ✅ <span className={`transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>No ads</span>
            </motion.span>
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              ✅ <span className={`transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Privacy first</span>
            </motion.span>
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              ✅ <span className={`transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>Secure</span>
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className={`w-full h-32 transition-colors duration-500 ${isDarkMode ? 'fill-slate-800/20' : 'fill-blue-100/20'
          }`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </div>
  );
}

