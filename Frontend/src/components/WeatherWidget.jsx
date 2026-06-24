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
    <div className="weather-widget">
      <div className="weather-header">
        <span className="weather-date">{formatDate(dateTime)}</span>
        <span className="weather-time">{formatTime(dateTime)}</span>
      </div>
      <div className="weather-body">
        {weather ? (
          <>
            <div className="weather-sec-left">
              {getWeatherIcon(weather.condition)}
              <span className="weather-condition-text">{weather.condition}</span>
            </div>
            <div className="weather-divider" />
            <div className="weather-sec-middle">
              <span className="weather-temp">{weather.temp}°C</span>
              <div className="weather-sub-item">
                <Thermometer size={16} />
                <span>{weather.pressure} hPa Pressure</span>
              </div>
            </div>
            <div className="weather-divider" />
            <div className="weather-sec-right">
              <div className="weather-sub-item-row">
                <Wind size={20} />
                <div className="sub-item-detail">
                  <span className="detail-value">{weather.windSpeed} km/h</span>
                  <span className="detail-label">Wind</span>
                </div>
              </div>
              <div className="weather-sub-item-row">
                <Droplets size={20} />
                <div className="sub-item-detail">
                  <span className="detail-value">{weather.humidity}%</span>
                  <span className="detail-label">Humidity</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="weather-loading">Loading weather data...</div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
