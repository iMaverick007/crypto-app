import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../features/newsSlice";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // Function to trim the description and add ellipsis
  const trimDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white min-h-screen py-16">
      <div className="container mx-auto px-4 flex flex-col justify-center h-full">
      <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
          Explore <span className="text-yellow-400">Latest News</span>
        </h1>

        {status === "loading" && (
          <div className="flex justify-center items-center h-full">
            <div className="text-4xl font-extrabold tracking-wide text-center">
              <span className="animate-typewriter border-r-4 border-yellow-400 pr-2">
                Loading the latest news articles...
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(
                (article) =>
                  article.urlToImage && article.description && article.title
              ) // Filter out incomplete articles
              .map((article, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white hover:scale-105 transform transition-all duration-300"
                >
                  {/* Card Content */}
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-lg mb-4 border-2 border-yellow-400"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-yellow-400 mb-4">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    {trimDescription(article.description, 120)}
                  </p>
                  <a
                    href={article.url}
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