/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */

import { useState } from "react";
import { Dimensions, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { greyBlue, whiteColor } from "../assets/colors/colors";
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('screen');

export default function HomeScreen({ navigation }) {
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.img} source={require('../assets/images/background-Img-3.jpg')} >
                <Text style={styles.header}>Weather App</Text>
                <View style={styles.searchCont}>
                    <TextInput
                        placeholder="Search place"
                        placeholderTextColor={greyBlue}
                        cursorColor={greyBlue}
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Main', { city: search });
                            Keyboard.dismiss; setSearch('');
                        }}
                    >
                        <MagnifyingGlassIcon size={22} color={greyBlue} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        flex: 1,
        height: height,
        width: '100%',
    },
    header: {
        alignSelf: 'center',
        color: whiteColor,
        fontSize: 40,
        marginTop: 110,
        // fontFamily: 'Ubuntu-Bold',
        fontFamily: 'Sono_Proportional-SemiBold',
    },
    searchCont: {
        width: width * 0.7,
        alignSelf: 'center',
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    searchInput: {
        fontSize: 15,
        fontWeight: '400',
        color: greyBlue,
    },
})