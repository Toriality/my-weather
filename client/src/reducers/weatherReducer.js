import {
  GET_WEATHER,
  SET_WEATHER_LOCATION,
  WEATHER_LOADING,
} from "../actions/types";

const initialState = {
  weather: {
    city: null,
    country: null,
    temp: null,
    tempMax: null,
    tempMin: null,
    weather: null,
    weatherDesc: null,
    weatherIcon: null,
  },
  loading: false,
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        weather: {
          temp: action.payload[0],
          tempMax: action.payload[1],
          tempMin: action.payload[2],
          weather: action.payload[3],
          weatherDesc: action.payload[4],
          weatherIcon: action.payload[5],
        },
        loading: false,
      };
    case WEATHER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_WEATHER_LOCATION:
      return {
        ...state,
        weather: {
          city: action.payload[0],
          country: action.payload[1],
        },
        loading: true,
      };
    default:
      return state;
  }
}
