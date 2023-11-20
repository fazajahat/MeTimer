import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moodsRatingInitial from "../data/moodsRatingInitial";
import chipsData from "../data/chipsData";
import emotions from "../data/emotions";
const baseUrl = "http://10.0.2.2:3000";
const serverUrl = "https://movies.gjuniarto.com";

export const useMainStore = create((set) => ({
    serverUrl: "https://movies.gjuniarto.com",
    quote: [],
    records: [],
    journalResponse: {},
    moodsRating: moodsRatingInitial,
    selectedMood: {
        emote: "emoticon-cool-outline",
        rating: 3,
        color: "#52a0a6",
        pressed: false,
        colorWhenPressed: "#52a0a6",
        topText: "How are you feeling today?"
    },
    chipsData: emotions,
    toggleChips: (rating, chip) => {
        set((state) => {
            const newChipsData = { ...state.chipsData };
            newChipsData[rating][chip] = !newChipsData[rating][chip];
            return { chipsData: newChipsData };
        });
    },
    specialSetter: (key, payload) => {
        set((state) => {
            return { [key]: payload };
        });
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
            const { data: response } = await axios({
                url: `${serverUrl}/quotes`,
                method: "GET",
                headers: {
                    access_token: await AsyncStorage.getItem("token")
                }
            });
            console.log(response);

            if (response) {
                set({ quote: [response] });
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
                password
            });
            console.log(response);
            await AsyncStorage.setItem("token", response.access_token);
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
                password: data.password
            });
            console.log(res);
        } catch (error) {
            console.log(error.response, "register main store");
            throw error;
        }
    },
    postJournal: async (data) => {
        try {
            await axios.post(`${serverUrl}/records`, data, { headers: { access_token: await AsyncStorage.getItem("token") } });
        } catch (error) {
            throw error;
        }
    },
    getRecords: async () => {
        try {
            const { data: response } = await axios.get(`${serverUrl}/records`, { headers: { access_token: await AsyncStorage.getItem("token") } });
            console.log(response, "getRecord Log");
            set({ records: response });
        } catch (error) {
            throw error;
        }
    },

    getJournalResponse: async (journal_content) => {
        try {
            const { data: journalResponse } = await axios({
                method: "post",
                url: `${serverUrl}/journalResponse`,
                data: {
                    journal_content
                },
                headers: { access_token: await AsyncStorage.getItem("token") }
            });
            set({ journalResponse });
        } catch (error) {
            console.log(error.response.data);
            throw error;
        }
    }
}));
