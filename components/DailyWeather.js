/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkBlue } from '../assets/colors/colors';
import DayComponent from './DayComponent';
import { useEffect, useState } from 'react';
import { fetchForecastPerDay } from '../api/weatherdb';


export default function DailyWeather({date, city}) {
    const day = new Date(date).getDay();
    // console.log('#### ', city);
    // console.log('===', day); // Sunday - Saturday : 0 - 6

    useEffect(() => {
        getForecast7DaysWeatherData();
    },[]);

    const getForecast7DaysWeatherData = async ( params) => {
        const data = await fetchForecastPerDay({
            q: city,
            days: 7,
        });
        console.log('~~~~~ ', data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.yesterday}>
                    <Text style={styles.pastDay}>Yesterday</Text>
                    <Text style={styles.pastDay}>13° 7°</Text>
                </View>
                <DayComponent day={day} />
                <DayComponent day={day + 1} />
                <DayComponent day={day + 2} />
                <DayComponent day={day + 3} />
                <DayComponent day={day + 4} />
                <DayComponent day={day + 4 === 6 && 0} />
                <DayComponent day={day - 1} />
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
