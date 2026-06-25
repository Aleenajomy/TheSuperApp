import React, { useState, useEffect } from "react";
import { fetchTopHeadlines } from "../services/newsApi";

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch articles on mount
  useEffect(() => {
    const getNews = async () => {
      const data = await fetchTopHeadlines("general", "");
      setArticles(data);
    };
    getNews();
  }, []);

  // Set up 2-second rotation interval
  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [articles]);

  if (articles.length === 0) {
    return <div className="news-widget news-loading">Loading news articles...</div>;
  }

  const currentArticle = articles[currentIndex];

  // Helper to format Date nicely
  const formatPublishedDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${m}-${d}-${y} | ${time}`;
  };

  return (
    <div className="news-widget card border-0 shadow h-100 overflow-hidden" style={{ borderRadius: "20px" }}>
      <div className="news-image-section position-relative overflow-hidden" style={{ height: "55%", minHeight: "220px" }}>
        <img
          src={currentArticle.urlToImage}
          alt={currentArticle.title}
          className="news-image w-100 h-100 object-fit-cover"
        />
        <div className="news-gradient-overlay position-absolute start-0 top-0 w-100 h-100" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)" }} />
        <div className="news-headline-card position-absolute bottom-0 start-0 w-100 p-4 text-white text-start">
          <h3 className="news-title h5 fw-bold mb-2" style={{ display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>{currentArticle.title}</h3>
          <span className="news-date small text-light-50">
            {formatPublishedDate(currentArticle.publishedAt)}
          </span>
        </div>
      </div>
      <div className="news-description-section card-body p-4 d-flex flex-column justify-content-between bg-white text-dark text-start">
        <p className="news-description mb-3" style={{ fontSize: "0.95rem", lineHeight: "1.6", overflowY: "auto", maxHeight: "150px" }}>{currentArticle.description}</p>
        <span className="news-source text-secondary fw-semibold small">- {currentArticle.source?.name || "Source"}</span>
      </div>
    </div>
  );
};

export default NewsWidget;
