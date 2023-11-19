import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = "http://10.0.2.2:3000";
const serverUrl = "https://5053-103-1-51-83.ngrok-free.app";

export const useMainStore = create((set) => ({
  quote: [],
  getQuote: async () => {
    try {
      const response = await axios.get(`https://type.fit/api/quotes`);
      if (response.data) {
        set({ quote: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  login: async (email, password) => {
    try {
      const res = await axios.post(`${serverUrl}/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (error) {
      console.log(error);
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
