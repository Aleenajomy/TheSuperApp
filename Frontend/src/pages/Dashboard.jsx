import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import NotesWidget from "../components/NotesWidget";
import TimerWidget from "../components/TimerWidget";
import avatarImg from "../assets/user_avatar.png";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid-container">
        {/* Main Grid widgets */}
        <div className="widget-item user-profile-card">
          <div className="profile-avatar-container">
            <img src={avatarImg} alt="User avatar" className="profile-avatar" />
          </div>
          <div className="profile-details-container">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <h1 className="profile-username">{user.username}</h1>
            
            <div className="profile-categories-chips">
              {categories.map((catId) => (
                <div key={catId} className="profile-chip">
                  {catId}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="widget-item weather-widget-container">
          <WeatherWidget />
        </div>

        <div className="widget-item notes-widget-container">
          <NotesWidget />
        </div>

        <div className="widget-item news-widget-container">
          <NewsWidget />
        </div>

        <div className="widget-item timer-widget-container">
          <TimerWidget />
        </div>
      </div>

      <div className="dashboard-browse-footer">
        <button
          className="browse-movies-btn"
          onClick={() => navigate("/movies")}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
