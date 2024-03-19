/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import axios from "axios";
import { apiKey } from "../constants";

// forecast weather 1 day:
// http://api.weatherapi.com/v1/forecast.json?key=0fa7f89ce07f48b3a75134133241303&q=veliko turnovo&days=1

const baseUrl = 'http://api.weatherapi.com/v1';
const currentWeather = `${baseUrl}/current.json?key=${apiKey}`;
const forecast1Day = `${baseUrl}/forecast.json?key=${apiKey}`;


const apiRequest = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    };

    try {
        const response = await axios.request(options);
        // console.log('RESPONSE ----', response);
        return response;
    } catch (error) {
        console.log('ERROR IN apiRequest(): ' , error);
        return {};
    }
};

const fetchCurrentWeather = async (params) => {
    return apiRequest(currentWeather, params);
};

const fetchForecastPerDay = async (params) => {
    return apiRequest(forecast1Day, params);
};

export {
    fetchCurrentWeather,
    fetchForecastPerDay,
};