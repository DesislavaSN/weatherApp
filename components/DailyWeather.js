/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkBlue } from '../assets/colors/colors';
import DayComponent from './DayComponent';
import { useEffect, useState } from 'react';
import { fetchForecastPerDay, fetchHistoryForecast } from '../api/weatherdb';


export default function DailyWeather({city}) {
    // console.log('CITY IS:', city);
    const currDate = new Date();
    const yesterday = new Date(currDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const prevDate = yesterday.toISOString().slice(0, 10);
    const [historyForecast, setHistoryForecast] = useState({});
    const [sevenDaysForecast, setSevenDaysForecast] = useState([]);

    useEffect(() => {
        getForecast7DaysWeatherData();
        getForecastPrevDay();
    },[]);

    const getForecast7DaysWeatherData = async () => {
        const data = await fetchForecastPerDay({
            q: city.trim(),
            days: 7,
        });
        if (data && data.data.forecast.forecastday) {
            setSevenDaysForecast(data.data.forecast.forecastday);
        }
    };

    const getForecastPrevDay = async () => {
        const data = await fetchHistoryForecast({
            q: city.trim(),
            dt: prevDate.trim(),
        });
        if (data && data.data) {
            setHistoryForecast(data.data);
        }
    };

    // console.log('>>>>>', sevenDaysForecast.length);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.yesterday}>
                    <Text style={styles.pastDay}>Yesterday</Text>
                    <Text style={styles.pastDay}>
                        {Math.round(historyForecast.forecast?.forecastday[0]?.day?.maxtemp_c)}°
                        {Math.round(historyForecast.forecast?.forecastday[0]?.day?.mintemp_c)}°
                    </Text>
                </View>
                {
                    sevenDaysForecast.map((el, i) => {
                        return (
                            <DayComponent key={i} day={el.date} data={el} />
                        );
                    })
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        borderRadius: 20,
        padding: 15,
        backgroundColor: darkBlue,
    },
    yesterday: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    pastDay: {
        color: '#607274',
        fontWeight: '600',
        fontSize: 17,
    },
});
