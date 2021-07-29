import axios from "axios";
import { WEATHER_LOADING, GET_WEATHER, SET_WEATHER_LOCATION } from "./types";
import config from "../config/default";

export const getWeather = (city, country) => (dispatch) => {
  const KELVIN = 273.15;

  dispatch(setWeatherLoading());

  console.log("location set to " + city + " " + country);

  let options = {
    url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${config.REACT_APP_APPID}`,
    method: "GET",
  };

  axios(options)
    .then((res) => {
      const temp = (res.data.main.temp - KELVIN).toPrecision(3);
      const tempMax = (res.data.main.temp_max - KELVIN).toPrecision(3);
      const tempMin = (res.data.main.temp_min - KELVIN).toPrecision(3);
      const weather = res.data.weather[0].main;
      const weatherDesc = res.data.weather[0].description;
      const weatherIcon = res.data.weather[0].icon;
      dispatch({
        type: GET_WEATHER,
        payload: [temp, tempMax, tempMin, weather, weatherDesc, weatherIcon],
      });
    })
    .catch((err) => {
      const error = "ERROR: City/Country combination is invalid";
      const temp = error;
      dispatch({
        type: GET_WEATHER,
        payload: [temp],
      });
    });
};

export const setWeatherLoading = () => {
  return {
    type: WEATHER_LOADING,
  };
};

export const setWeatherLocation = (city, country) => (dispatch, getState) => {
  console.log("FUNCTION SETWEATHERLOCATION executed - " + city + " " + country);
  dispatch(
    {
      type: SET_WEATHER_LOCATION,
      payload: [city, country],
    },
    getWeather()
  );
  console.log(getState().weather.weather.city);
};
