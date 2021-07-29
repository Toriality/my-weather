import {
  GET_WEATHER,
  GET_WEATHER_WEEK,
  SET_WEATHER_LOCATION,
  WEATHER_LOADING,
} from "../actions/types";

const initialState = {
  city: null,
  country: null,
  now: {
    tempMin: null,
    weather: null,
    weatherDesc: null,
    weatherIcon: null,
  },
  week: {
    temp: [],
    tempMax: [],
    tempMin: [],
    weatherDesc: [],
    weather: [],
    weatherIcon: [],
  },
  loading: false,
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return {
        ...state,
        now: {
          temp: action.payload[0],
          tempMax: action.payload[1],
          tempMin: action.payload[2],
          weather: action.payload[3],
          weatherDesc: action.payload[4],
          weatherIcon: action.payload[5],
        },
        loading: false,
      };
    case GET_WEATHER_WEEK:
      return {
        ...state,
        week: {
          temp: [
            action.payload[0],
            action.payload[1],
            action.payload[2],
            action.payload[3],
            action.payload[4],
            action.payload[5],
            action.payload[6],
          ],
          tempMax: [
            action.payload[7],
            action.payload[8],
            action.payload[9],
            action.payload[10],
            action.payload[11],
            action.payload[12],
            action.payload[13],
          ],
          tempMin: [
            action.payload[14],
            action.payload[15],
            action.payload[16],
            action.payload[17],
            action.payload[18],
            action.payload[19],
            action.payload[20],
          ],
          weather: [
            action.payload[21],
            action.payload[22],
            action.payload[23],
            action.payload[24],
            action.payload[25],
            action.payload[26],
            action.payload[27],
          ],
          weatherDesc: [
            action.payload[28],
            action.payload[29],
            action.payload[30],
            action.payload[31],
            action.payload[32],
            action.payload[33],
            action.payload[34],
          ],
          weatherIcon: [
            action.payload[35],
            action.payload[36],
            action.payload[37],
            action.payload[38],
            action.payload[39],
            action.payload[40],
            action.payload[41],
          ],
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
        city: action.payload[0],
        country: action.payload[1],
        loading: true,
      };
    default:
      return state;
  }
}
