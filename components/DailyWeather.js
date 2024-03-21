/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkBlue } from '../assets/colors/colors';
import DayComponent from './DayComponent';
import { useEffect, useState } from 'react';
import { fetchForecastPerDay } from '../api/weatherdb';


export default function DailyWeather({city}) {
    // console.log('CITY IS:', city);
    const [sevenDaysForecast, setSevenDaysForecast] = useState([]);
    useEffect(() => {
        getForecast7DaysWeatherData();
    },[]);

    const getForecast7DaysWeatherData = async () => {
        const data = await fetchForecastPerDay({
            q: city,
            days: 7,
        });
        if (data && data.data.forecast.forecastday) {
            setSevenDaysForecast(data.data.forecast.forecastday);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.yesterday}>
                    <Text style={styles.pastDay}>Yesterday</Text>
                    <Text style={styles.pastDay}>13° 7°</Text>
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
