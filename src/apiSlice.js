import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const featchWeather = createAsyncThunk(
  "weatherApi/fetchingWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=9e8f3063805f1d779997dd062d923c33",
      {
        // cancelToken: new axios.CancelToken((e) => {
        //   cancelAxios = e;
        // }),
      }
    );

    const CurrentTemp = Math.round(response.data.main.temp - 273);
    const max = Math.round(response.data.main.temp_max - 273);
    const min = Math.round(response.data.main.temp_min - 273);
    const disc = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;
    return { CurrentTemp, max, min, disc, icon };
  }
);

export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (currentState, action) => {
      currentState.result = "changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(featchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(featchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(featchWeather.rejected, (state, actions) => {
        state.isLoading = true;
      });
  },
});
export const { changeResult, isLoading } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
