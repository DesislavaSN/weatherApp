/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { whiteColor } from '../assets/colors/colors';
const { width, height } = Dimensions.get('screen');


export default function DayComponent({day}) {
    const [dayWeek, setDayWeek] = useState('Monday');
    console.log(day);
    const today = new Date().getDay();
    console.log('TODAY ---', today);

    useEffect(() => {
        getDayOfWeek();
    }, []);

    function getDayOfWeek() {
        // if (day.day === today) {
        //     setDayWeek('Today');
        // } else {
        //     if (day.day === 1) {
        //         setDayWeek('Monday');
        //     } else if (day.day === 2){
        //         setDayWeek('Tuesday');
        //     } else if (day.day === 3){
        //         setDayWeek('Wednesday');
        //     } else if (day.day === 4){
        //         setDayWeek('Thursday');
        //     } else if (day.day === 5){
        //         setDayWeek('Friday');
        //     } else if (day.day === 6){
        //         setDayWeek('Saturday');
        //     } else if (day.day === 0){
        //         setDayWeek('Sunday');
        //     }
        // }

        if (day === today) {
            setDayWeek('Today');
        } else if (day === 1) {
            setDayWeek('Monday');
        } else if (day === 2) {
            setDayWeek('Tuesday');
        } else if (day === 3) {
            setDayWeek('Wednesday');
        } else if (day === 4) {
            setDayWeek('Thursday');
        } else if (day === 5) {
            setDayWeek('Friday');
        } else if (day === 6) {
            setDayWeek('Saturday');
        } else if (day.day === 0) {
            setDayWeek('Sunday');
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.theDay}>{dayWeek}</Text>
            <View style={styles.forecast}>
                <Text style={styles.forecastEl}>8%</Text>
                <Image source={require('../assets/weather_icons/day/122.png')} />
                <Text style={styles.forecastEl}>13° 6°</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: whiteColor,
        height: 40,
    },
    theDay: {
        alignSelf: 'center',
        color: whiteColor,
        fontWeight: '500',
        fontSize: 18,
    },
    forecast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.45,
    },
    forecastEl: {
        color: whiteColor,
        fontWeight: '500',
        fontSize: 18,
    },
});
