import { create } from "zustand";
import axios from "axios";
const baseUrl = "http://10.0.2.2:3000";

export const useMainStore = create((set) => ({
  quote: [],
  getQuote: async () => {
    try {
      console.log("getQuote");
      const response = await axios.get(`https://type.fit/api/quotes`);
      if (response.data) {
        set({ quote: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
