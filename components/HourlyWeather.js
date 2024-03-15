/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { darkBlue, whiteColor } from '../assets/colors/colors';
const { width, height } = Dimensions.get('screen');

export default function HourlyWeather() {
    return (
        <View style={styles.hourlyWeatherCont}>
            <View style={styles.pastWeatherCont}>
                {/* v tozi text component se izpisva s text kakvo e bilo vremeto po-rano dnes ( da si proverq v app-a na tel-a)
                Ex: Periods of light rain early. Low 3°C.*/}
                <Text style={styles.pastWeatherText}>Rain. Low 6°C.</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.hourlyWeatherScrollCont}>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>16:00</Text>
                    <Image source={require('../assets/weather_icons/day/263.png')} />
                    <Text style={styles.degree}>7°</Text>
                    <Text style={styles.humidity}>79%</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>17:00</Text>
                    <Image source={require('../assets/weather_icons/day/263.png')} />
                    <Text style={styles.degree}>6°</Text>
                    <Text style={styles.humidity}>79%</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>18:00</Text>
                    <Image source={require('../assets/weather_icons/day/119.png')} />
                    <Text style={styles.degree}>7°</Text>
                    <Text style={styles.humidity}>11%</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>18:20</Text>
                    <Text style={styles.sun}>Sunset</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>19:00</Text>
                    <Image
                        source={require('../assets/weather_icons/night/122.png')}
                    />
                    <Text style={styles.degree}>6°</Text>
                    <Text style={styles.humidity}>9%</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>20:00</Text>
                    <Image
                        source={require('../assets/weather_icons/night/122.png')}
                    />
                    <Text style={styles.degree}>5°</Text>
                    <Text style={styles.humidity}>10%</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>21:00</Text>
                    <Image
                        source={require('../assets/weather_icons/night/122.png')}
                    />
                    <Text style={styles.degree}>5°</Text>
                    <Text style={styles.humidity}>10%</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>22:00</Text>
                    <Image
                        source={require('../assets/weather_icons/night/122.png')}
                    />
                    <Text style={styles.degree}>5°</Text>
                    <Text style={styles.humidity}>11%</Text>
                </View>
                <View style={styles.hourCont}>
                    <Text style={styles.hour}>23:00</Text>
                    <Image
                        source={require('../assets/weather_icons/night/122.png')}
                    />
                    <Text style={styles.degree}>4°</Text>
                    <Text style={styles.humidity}>19%</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    hourlyWeatherCont: {
        margin: 15,
        borderRadius: 20,
        padding: 15,
        backgroundColor: darkBlue,
    },
    pastWeatherCont: {
        marginTop: 10,
        marginBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
    },
    pastWeatherText: {
        marginBottom: 15,
        color: whiteColor,
        fontWeight: '700',
        fontSize: 17,
    },

    hourlyWeatherScrollCont: {
        flexDirection: 'row',
    },

    hourCont: {
        alignItems: 'center',
    },

    hour: {
        color: whiteColor,
        fontWeight: '500',
    },
    sun: {
        color: whiteColor,
        marginTop: 25,
        marginHorizontal: 5,
        fontSize: 17,
        fontWeight: '500',
    },
    degree: {
        color: whiteColor,
        fontSize: 19,
        fontWeight: '600',
        marginVertical: 5,
    },
    humidity: {
        color: whiteColor,
        fontWeight: '500',
    },
});
