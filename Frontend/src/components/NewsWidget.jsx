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
    <div className="news-widget">
      <div className="news-image-section">
        <img
          src={currentArticle.urlToImage}
          alt={currentArticle.title}
          className="news-image"
        />
        <div className="news-gradient-overlay" />
        <div className="news-headline-card">
          <h3 className="news-title">{currentArticle.title}</h3>
          <span className="news-date">
            {formatPublishedDate(currentArticle.publishedAt)}
          </span>
        </div>
      </div>
      <div className="news-description-section">
        <p className="news-description">{currentArticle.description}</p>
        <span className="news-source">- {currentArticle.source?.name || "Source"}</span>
      </div>
    </div>
  );
};

export default NewsWidget;
