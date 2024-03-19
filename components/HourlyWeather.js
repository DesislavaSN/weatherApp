/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
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

export default function HourlyWeather({ data, time, currWeather }) {
    // console.log('======== ', data);
    // console.log('===> ', currWeather?.current?.temp_c);

    return (
        <View style={styles.hourlyWeatherCont}>
            <View style={styles.pastWeatherCont}>
                {/* v tozi text component se izpisva s text kakvo e bilo vremeto po-rano dnes ( da si proverq v app-a na tel-a)
                Ex: Periods of light rain early. Low 3°C.*/}
                <Text style={styles.pastWeatherText}>{currWeather?.current?.condition?.text}</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.hourlyWeatherScrollCont}
            >
                {data?.map((el, i) => {
                    {/* console.log('SINGLE EL >>>', el); */}

                    return (
                        <View key={i} style={styles.hourCont}>
                            <Text style={styles.hour}>{el.time.slice(-5)}</Text>
                            <Image style={styles.img} source={{ uri: `https:${el?.condition?.icon}` }} />
                            <Text style={styles.degree}>{Math.round(el.temp_c)}°</Text>
                            <Text style={styles.humidity}>{el.humidity}%</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
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
        // borderWidth: 1,
        // borderColor: 'red',
        alignItems: 'center',
        marginRight: 10,
    },

    hour: {
        color: whiteColor,
        fontWeight: '500',
    },
    img: {
        width: 50,
        height: 50,
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


/* if(Number(el.time.slice(11,13)) >= Number(time.slice(0,2))) {
        console.log('true');
        return (
            <View key={i} style={styles.hourCont}>
                <Text style={styles.hour}>{el.time.slice(-5)}</Text>
                <Image style={styles.img} source={{ uri: `https:${el.condition.icon}`}} />
                <Text style={styles.degree}>{Math.round(el.temp_c)}°</Text>
                <Text style={styles.humidity}>{el.humidity}%</Text>
            </View>
        );
    } else {
        return (
            <View key={i} style={styles.hourCont}>
                <Text style={styles.hour}>{el.time.slice(-5)}</Text>
                <Image style={styles.img} source={{ uri: `https:${el.condition.icon}` }} />
                <Text style={styles.degree}>{Math.round(el.temp_c)}°</Text>
                <Text style={styles.humidity}>{el.humidity}%</Text>
            </View>
        );
    } 
    */