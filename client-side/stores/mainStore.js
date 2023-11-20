import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moodsRatingInitial from "../data/moodsRatingInitial";
const baseUrl = "http://10.0.2.2:3000";
const serverUrl = "https://5053-103-1-51-83.ngrok-free.app";

export const useMainStore = create((set) => ({
  quote: [],
  moodsRating: moodsRatingInitial,
  selectedMood: {
    emote: "emoticon-cool-outline",
    rating: 3,
    color: "#52a0a6",
    pressed: false,
    colorWhenPressed: "#7ef6ff",
    topText: "How are you feeling today?",
  },
  toggleMoodsRating: (idx) => {
    set((state) => {
      const newMoodsRating = state.moodsRating.map((mood, index) => {
        if (idx === index) {
          mood.pressed = !mood.pressed;
        } else {
          mood.pressed = false;
        }
        return mood;
      });
      return { moodsRating: newMoodsRating, selectedMood: newMoodsRating[idx] };
    });
  },
  getQuote: async () => {
    try {
      const response = await axios.get(`https://type.fit/api/quotes`);
      if (response.data) {
        set({ quote: response.data });
        console.log("quote fetched");
      }
    } catch (error) {
      console.log(error);
    }
  },
  login: async ({ email, password }) => {
    try {
      console.log(email, password);
      const { data: response } = await axios.post(`${serverUrl}/login`, {
        email,
        password,
      });
      console.log(response);
      await AsyncStorage.setItem("token", response.access_token);
      console.log(res);
    } catch (error) {
      console.log(error, "<<<<<< login eror");
    }
  },
  register: async (data) => {
    try {
      const res = await axios.post(`${serverUrl}/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
}));
