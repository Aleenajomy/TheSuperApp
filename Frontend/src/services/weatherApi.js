import axios from "axios";

const MOCK_WEATHER = {
  temp: 24,
  pressure: 1010,
  humidity: 83,
  windSpeed: 3.7,
  condition: "Heavy rain",
  icon: "11d", // Thunderstorm/rainy code
};

const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const fetchCurrentWeather = async (city = "Mumbai", apiKey = "") => {
  const key = apiKey || import.meta.env.VITE_WEATHER_API_KEY || "";
  if (!key) {
    return MOCK_WEATHER;
  }
  try {
    const response = await weatherClient.get(
      `/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
    );
    const data = response.data;
    return {
      temp: Math.round(data.main.temp),
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.warn("Weather service failure, using fallback mock data:", error);
    return MOCK_WEATHER;
  }
};
