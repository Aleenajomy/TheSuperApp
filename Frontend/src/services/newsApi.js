import axios from "axios";

const MOCK_NEWS = [
  {
    title: "Want to climb Mount Everest?",
    publishedAt: "2023-02-20T19:35:00Z",
    description: "In the years since human beings first reached the summit of Mount Everest in 1953, climbing the world's highest mountain has changed dramatically. Today, hundreds of mountaineers manage the feat each year thanks to improvements in knowledge, technology, and the significant infrastructure provided by commercially guided expeditions that provide a veritable highway up the mountain for those willing to accept both the risk and the cost.",
    urlToImage: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&q=80&w=800",
    source: { name: "Nature & Adventure" }
  },
  {
    title: "The Rise of Artificial Intelligence in Healthcare",
    publishedAt: "2026-06-24T10:15:00Z",
    description: "Medical researchers and AI experts are collaborating to build predictive models that identify early stages of complex illnesses. By utilizing deep learning algorithms on vast datasets of medical scans, diagnostics are reaching record speeds and accuracies, promising a new era of personalized patient care.",
    urlToImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    source: { name: "Tech Health Journal" }
  },
  {
    title: "Exploring the Deep Ocean: New Species Discovered",
    publishedAt: "2026-06-23T14:45:00Z",
    description: "A deep-sea exploration mission in the Mariana Trench has uncovered several previously undocumented marine organisms. Equipped with state-of-the-art robotic submersibles, scientists captured stunning footage of bio-luminescent creatures living in extreme pressures and temperatures.",
    urlToImage: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800",
    source: { name: "Oceanic Science" }
  },
  {
    title: "Renewable Energy Capacity Surges Worldwide",
    publishedAt: "2026-06-22T09:00:00Z",
    description: "Global solar and wind capacity has grown exponentially over the past year. Nations are accelerating transitions to green energy grids, driven by policy incentives and significant reductions in manufacturing costs for solar photovoltaic panels and advanced wind turbines.",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    source: { name: "Eco Chronicles" }
  },
  {
    title: "Mars Rover Finds Ancient Lakebed Clues",
    publishedAt: "2026-06-21T16:20:00Z",
    description: "The robotic explorer on Mars has analyzed chemical samples from clay-rich sediments, confirming the long-term presence of liquid water in the planet's distant past. The minerals gathered suggest that environmental conditions were once favorable for microbial life forms.",
    urlToImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800",
    source: { name: "Space Exploration" }
  }
];

const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

export const fetchTopHeadlines = async (category = "general", apiKey = "") => {
  const key = apiKey || import.meta.env.VITE_NEWS_API_KEY || "";
  
  if (key) {
    try {
      const response = await newsClient.get(
        `/top-headlines?category=${category}&language=en&apiKey=${key}`
      );
      const articles = (response.data.articles || []).filter(
        (a) => a.title && a.urlToImage && a.description
      );
      if (articles.length > 0) {
        return articles;
      }
    } catch (error) {
      console.warn("Official NewsAPI failure, attempting fallback mirror:", error);
    }
  }

  // Fallback 1: Fetch live, real-time news using RSS-to-JSON converter on BBC News RSS
  try {
    const response = await axios.get(
      "https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/rss.xml"
    );
    const items = response.data.items || [];
    if (items.length > 0) {
      const mappedArticles = items.map((item) => ({
        title: item.title,
        publishedAt: item.pubDate,
        description: item.description,
        urlToImage: item.thumbnail || (item.enclosure && item.enclosure.link) || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
        source: { name: "BBC News" }
      }));
      return mappedArticles;
    }
  } catch (rssError) {
    console.warn("Live RSS news fetch failed, attempting static mirror fallback:", rssError);
  }

  // Fallback 2: Fallback to saurav.tech/NewsAPI cached mirror (static 2022 news)
  try {
    const response = await axios.get(
      `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`
    );
    const articles = (response.data.articles || []).filter(
      (a) => a.title && a.urlToImage && a.description
    );
    if (articles.length > 0) {
      return articles;
    }
  } catch (fallbackError) {
    try {
      const response = await axios.get(
        `https://saurav.tech/NewsAPI/top-headlines/category/${category}/us.json`
      );
      const articles = (response.data.articles || []).filter(
        (a) => a.title && a.urlToImage && a.description
      );
      if (articles.length > 0) {
        return articles;
      }
    } catch (usFallbackError) {
      console.warn(
        "Fallback news mirror failed for both region codes, using local mock news:",
        usFallbackError
      );
    }
  }

  return MOCK_NEWS;
};
