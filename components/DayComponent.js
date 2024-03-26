/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { whiteColor } from '../assets/colors/colors';
const { width, height } = Dimensions.get('screen');


export default function DayComponent({data, day}) {
    const [dayWeek, setDayWeek] = useState('');
    const today = new Date().getDay();

    useEffect(() => {
        getDayOfWeek();
    }, []);

    function getDayOfWeek() {
        let theDay = new Date(day).getDay();

        if (theDay === today) {
            setDayWeek('Today');
        } else if (theDay === 1) {
            setDayWeek('Monday');
        } else if (theDay === 2) {
            setDayWeek('Tuesday');
        } else if (theDay === 3) {
            setDayWeek('Wednesday');
        } else if (theDay === 4) {
            setDayWeek('Thursday');
        } else if (theDay === 5) {
            setDayWeek('Friday');
        } else if (theDay === 6) {
            setDayWeek('Saturday');
        } else if (theDay === 0) {
            setDayWeek('Sunday');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.theDay}>{dayWeek}</Text>
            <View style={styles.forecast}>
                <Text style={styles.forecastEl}>
                    {data.day.daily_chance_of_rain}%
                </Text>
                <Image style={styles.img} source={{ uri: `https:${data.day.condition.icon}`}} />
                <Text style={styles.forecastEl}>{Math.round(data.day?.maxtemp_c)}° {Math.round(data.day?.mintemp_c)}°</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    img: {
        width: 40,
        height: 40,
    },
});
