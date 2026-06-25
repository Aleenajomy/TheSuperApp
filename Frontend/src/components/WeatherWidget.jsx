import React, { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../services/weatherApi";
import { Thermometer, Wind, Droplets, CloudLightning, CloudRain, Sun, Cloud } from "lucide-react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());

  // Weather query on mount
  useEffect(() => {
    const getWeather = async () => {
      //Mumbai as default city, no api key by default (uses fallback)
      const data = await fetchCurrentWeather("Mumbai", "");
      setWeather(data);
    };
    getWeather();
  }, []);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatting date: M-D-YYYY
  const formatDate = (date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    return `${m}-${d}-${y}`;
  };

  // Formatting time: hh:mm PM/AM
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Condition icons selection
  const getWeatherIcon = (condition) => {
    const cond = (condition || "").toLowerCase();
    if (cond.includes("thunder") || cond.includes("lightning") || cond.includes("heavy rain")) {
      return <CloudLightning size={42} className="weather-icon-svg" />;
    }
    if (cond.includes("rain") || cond.includes("drizzle")) {
      return <CloudRain size={42} className="weather-icon-svg" />;
    }
    if (cond.includes("clear") || cond.includes("sun")) {
      return <Sun size={42} className="weather-icon-svg" />;
    }
    if (cond.includes("cloud")) {
      return <Cloud size={42} className="weather-icon-svg" />;
    }
    return <CloudRain size={42} className="weather-icon-svg" />;
  };

  return (
    <div className="weather-widget card border-0 text-white shadow h-100" style={{ backgroundColor: "#101426", borderRadius: "20px" }}>
      <div className="weather-header d-flex justify-content-between px-4 py-2 text-white" style={{ backgroundColor: "#FF5E7E", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", fontSize: "1.25rem", fontWeight: "700" }}>
        <span className="weather-date">{formatDate(dateTime)}</span>
        <span className="weather-time">{formatTime(dateTime)}</span>
      </div>
      <div className="weather-body card-body d-flex flex-row align-items-center justify-content-between p-4">
        {weather ? (
          <>
            <div className="weather-sec-left d-flex flex-column align-items-center gap-2 flex-fill">
              {getWeatherIcon(weather.condition)}
              <span className="weather-condition-text fs-6 fw-medium text-center">{weather.condition}</span>
            </div>
            <div className="weather-divider d-none d-sm-block bg-white bg-opacity-15" style={{ width: "1px", height: "70px", margin: "0 10px" }} />
            <div className="weather-sec-middle d-flex flex-column align-items-center gap-1 flex-fill">
              <span className="weather-temp display-6 fw-medium text-nowrap">{weather.temp}°C</span>
              <div className="weather-sub-item d-flex align-items-center gap-1 small text-light bg-dark bg-opacity-25 px-2 py-1 rounded">
                <Thermometer size={14} />
                <span>{weather.pressure} hPa</span>
              </div>
            </div>
            <div className="weather-divider d-none d-sm-block bg-white bg-opacity-15" style={{ width: "1px", height: "70px", margin: "0 10px" }} />
            <div className="weather-sec-right d-flex flex-column gap-2 flex-fill ps-2">
              <div className="weather-sub-item-row d-flex align-items-center gap-2">
                <Wind size={18} className="text-secondary" />
                <div className="sub-item-detail d-flex flex-column text-start">
                  <span className="detail-value small fw-bold">{weather.windSpeed} km/h</span>
                  <span className="detail-label text-secondary" style={{ fontSize: "0.75rem" }}>Wind</span>
                </div>
              </div>
              <div className="weather-sub-item-row d-flex align-items-center gap-2">
                <Droplets size={18} className="text-secondary" />
                <div className="sub-item-detail d-flex flex-column text-start">
                  <span className="detail-value small fw-bold">{weather.humidity}%</span>
                  <span className="detail-label text-secondary" style={{ fontSize: "0.75rem" }}>Humidity</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="weather-loading text-center w-100 p-4 text-secondary">Loading weather data...</div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
