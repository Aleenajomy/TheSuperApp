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
    <div className="dashboard-page container-fluid min-vh-100 p-4 p-md-5 bg-black text-white d-flex flex-column justify-content-between">
      <div className="row g-4 mb-4">
        {/* Left and Middle column cluster (8 cols on lg) */}
        <div className="col-12 col-lg-8">
          <div className="row g-4">
            {/* Profile + Weather column (7 cols on md) */}
            <div className="col-12 col-md-7 d-flex flex-column gap-4">
              <div className="widget-item user-profile-card flex-grow-1 card border-0 text-white shadow p-4 d-flex flex-row align-items-center gap-4" style={{ background: "linear-gradient(135deg, #573cfa 0%, #7a52ff 100%)", borderRadius: "20px" }}>
                <div className="profile-avatar-container rounded-circle border border-3 border-white overflow-hidden flex-shrink-0" style={{ width: "100px", height: "100px" }}>
                  <img src={avatarImg} alt="User avatar" className="w-100 h-100 object-fit-cover" />
                </div>
                <div className="profile-details-container text-start">
                  <h2 className="profile-name fs-5 fw-normal mb-1">{user.name}</h2>
                  <p className="profile-email small text-light-50 mb-2">{user.email}</p>
                  <h1 className="profile-username h3 fw-bold mb-3">{user.username}</h1>
                  
                  <div className="profile-categories-chips d-flex flex-wrap gap-1">
                    {categories.map((catId) => (
                      <span key={catId} className="profile-chip badge bg-white bg-opacity-25 text-white px-3 py-2 rounded-pill fw-medium" style={{ fontSize: "0.75rem" }}>
                        {catId}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="widget-item weather-widget-container">
                <WeatherWidget />
              </div>
            </div>

            {/* Notes column (5 cols on md) */}
            <div className="col-12 col-md-5 d-flex">
              <div className="widget-item notes-widget-container w-100 bg-warning text-dark" style={{ borderRadius: "20px" }}>
                <NotesWidget />
              </div>
            </div>

            {/* Timer (full width of the 8-col cluster) */}
            <div className="col-12">
              <div className="widget-item timer-widget-container" style={{ backgroundColor: "#1E233E", borderRadius: "20px" }}>
                <TimerWidget />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: News (4 cols on lg) */}
        <div className="col-12 col-lg-4 d-flex">
          <div className="widget-item news-widget-container w-100 bg-white text-dark" style={{ borderRadius: "20px" }}>
            <NewsWidget />
          </div>
        </div>
      </div>

      <div className="dashboard-browse-footer text-end mt-2">
        <button
          className="btn btn-success rounded-pill px-5 py-2 fs-5 fw-bold"
          onClick={() => navigate("/movies")}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
