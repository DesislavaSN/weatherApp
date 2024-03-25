/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import axios from 'axios';
import { apiKey } from '../constants';

const baseUrl = 'https://api.weatherapi.com/v1';
const currentWeather = `${baseUrl}/current.json?key=${apiKey}`;
const forecast1Day = `${baseUrl}/forecast.json?key=${apiKey}`;
const forecastHistory = `${baseUrl}/history.json?key=${apiKey}`;

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

const fetchHistoryForecast = async (params) => {
    return apiRequest(forecastHistory, params);
};

export {
    fetchCurrentWeather,
    fetchForecastPerDay,
    fetchHistoryForecast,
};