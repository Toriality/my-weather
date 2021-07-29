import axios from "axios";
import {
  WEATHER_LOADING,
  GET_WEATHER,
  GET_WEATHER_WEEK,
  SET_WEATHER_LOCATION,
} from "./types";
import config from "../config/default";

export const getWeather = (city, country) => (dispatch) => {
  const KELVIN = 273.15;

  dispatch(setWeatherLoading());

  const options = {
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

  getWeatherWeek(city, country);
};

export const getWeatherWeek = (city, country) => (dispatch) => {
  const KELVIN = 273.15;

  dispatch(setWeatherLoading());

  const options = {
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&cnt=7&appid=${config.REACT_APP_APPID}`,
    method: "GET",
  };

  axios(options)
    .then((res) => {
      const temp0 = (res.data.list[0].main.temp - KELVIN).toPrecision(3);
      const temp1 = (res.data.list[1].main.temp - KELVIN).toPrecision(3);
      const temp2 = (res.data.list[2].main.temp - KELVIN).toPrecision(3);
      const temp3 = (res.data.list[3].main.temp - KELVIN).toPrecision(3);
      const temp4 = (res.data.list[4].main.temp - KELVIN).toPrecision(3);
      const temp5 = (res.data.list[5].main.temp - KELVIN).toPrecision(3);
      const temp6 = (res.data.list[6].main.temp - KELVIN).toPrecision(3);

      const tempMin0 = (res.data.list[0].main.temp_min - KELVIN).toPrecision(3);
      const tempMin1 = (res.data.list[1].main.temp_min - KELVIN).toPrecision(3);
      const tempMin2 = (res.data.list[2].main.temp_min - KELVIN).toPrecision(3);
      const tempMin3 = (res.data.list[3].main.temp_min - KELVIN).toPrecision(3);
      const tempMin4 = (res.data.list[4].main.temp_min - KELVIN).toPrecision(3);
      const tempMin5 = (res.data.list[5].main.temp_min - KELVIN).toPrecision(3);
      const tempMin6 = (res.data.list[6].main.temp_min - KELVIN).toPrecision(3);

      const tempMax0 = (res.data.list[0].main.temp_max - KELVIN).toPrecision(3);
      const tempMax1 = (res.data.list[1].main.temp_max - KELVIN).toPrecision(3);
      const tempMax2 = (res.data.list[2].main.temp_max - KELVIN).toPrecision(3);
      const tempMax3 = (res.data.list[3].main.temp_max - KELVIN).toPrecision(3);
      const tempMax4 = (res.data.list[4].main.temp_max - KELVIN).toPrecision(3);
      const tempMax5 = (res.data.list[5].main.temp_max - KELVIN).toPrecision(3);
      const tempMax6 = (res.data.list[6].main.temp_max - KELVIN).toPrecision(3);

      const weather0 = res.data.list[0].weather[0].main;
      const weather1 = res.data.list[1].weather[0].main;
      const weather2 = res.data.list[2].weather[0].main;
      const weather3 = res.data.list[3].weather[0].main;
      const weather4 = res.data.list[4].weather[0].main;
      const weather5 = res.data.list[5].weather[0].main;
      const weather6 = res.data.list[6].weather[0].main;

      const weatherDesc0 = res.data.list[0].weather[0].description;
      const weatherDesc1 = res.data.list[1].weather[0].description;
      const weatherDesc2 = res.data.list[2].weather[0].description;
      const weatherDesc3 = res.data.list[3].weather[0].description;
      const weatherDesc4 = res.data.list[4].weather[0].description;
      const weatherDesc5 = res.data.list[5].weather[0].description;
      const weatherDesc6 = res.data.list[6].weather[0].description;

      const weatherIcon0 = res.data.list[0].weather[0].icon;
      const weatherIcon1 = res.data.list[1].weather[0].icon;
      const weatherIcon2 = res.data.list[2].weather[0].icon;
      const weatherIcon3 = res.data.list[3].weather[0].icon;
      const weatherIcon4 = res.data.list[4].weather[0].icon;
      const weatherIcon5 = res.data.list[5].weather[0].icon;
      const weatherIcon6 = res.data.list[6].weather[0].icon;

      dispatch({
        type: GET_WEATHER_WEEK,
        payload: [
          temp0,
          temp2,
          temp3,
          temp4,
          temp5,
          temp6,
          temp1,
          tempMin0,
          tempMin1,
          tempMin2,
          tempMin3,
          tempMin4,
          tempMin5,
          tempMin6,
          tempMax0,
          tempMax1,
          tempMax2,
          tempMax3,
          tempMax4,
          tempMax5,
          tempMax6,
          weather0,
          weather1,
          weather2,
          weather3,
          weather4,
          weather5,
          weather6,
          weatherDesc0,
          weatherDesc1,
          weatherDesc2,
          weatherDesc3,
          weatherDesc4,
          weatherDesc5,
          weatherDesc6,
          weatherIcon0,
          weatherIcon1,
          weatherIcon2,
          weatherIcon3,
          weatherIcon4,
          weatherIcon5,
          weatherIcon6,
        ],
      });
    })
    .catch((err) => {
      throw err;
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
};
