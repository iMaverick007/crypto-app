import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../features/newsSlice";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews()); // Fetch news with a fixed query
  }, [dispatch]);

  const trimDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 tracking-wide">
          Explore <span className="text-yellow-400">Crypto News</span>
        </h1>

        {/* Loading state */}
        {status === "loading" && (
          <div className="flex justify-center items-center py-8">
            <div className="text-xl md:text-4xl font-extrabold tracking-wide text-center">
              <span className="animate-typewriter border-r-4 border-yellow-400 pr-2">
                Loading cryptocurrency news...
              </span>
            </div>
          </div>
        )}
        {status === "failed" && (
          <div className="text-center">
            <p className="text-red-500 font-semibold">Error: {error}</p>
          </div>
        )}
        {status === "succeeded" && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {articles
              .filter(
                (article) =>
                  article.image_url && article.description && article.title
              )
              .map((article, index) => (
                <div
                  key={index}
                  className="flex flex-col h-full p-4 md:p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white hover:scale-105 transform transition-all duration-300"
                >
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-lg mb-4 border-2 border-yellow-400"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-yellow-400 mb-4">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    {trimDescription(article.description, 120)}
                  </p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
                  >
                    Read more
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsFeed;