import axios from "axios";

const getPlacesData = async (type, { sw, ne }) => {
  try {
    const response = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw?.lat,
          tr_latitude: ne?.lat,
          bl_longitude: sw?.lng,
          tr_longitude: ne?.lng,
          limit: "20",
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

const getWeatherData = async ({ lat, lng }) => {
  try {
    const response = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        params: {
          lon: lng,
          lat: lat,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { getPlacesData, getWeatherData };
