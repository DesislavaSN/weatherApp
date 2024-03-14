/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BgColor, darkBlue, greyBlue, whiteColor } from '../assets/colors/colors';
import { MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/outline';
const { width, height } = Dimensions.get('screen');

// import Icon from 'react-native-vector-icons/FontAwesome';

export default function MainScreen() {
  function handleSearch(value) {
    if (value && value.length > 3) {
      console.log('VALUE >>', value);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.searchCont}>
          <TextInput
            placeholder="Search place"
            placeholderTextColor={greyBlue}
            cursorColor={greyBlue}
            style={styles.searchInput}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={Keyboard.dismiss}>
            <MagnifyingGlassIcon size={22} color={greyBlue} />
          </TouchableOpacity>
        </View>

        <View style={styles.currInfoCont}>
          <View style={styles.currInfoTextCont}>
            <Text style={styles.currDegree}>13°</Text>
            <Text style={styles.CurrCondition}>Cloudy</Text>
            <Text style={styles.CurrLocation}>
              Veliko Tarnovo{' '}
              <MapPinIcon size={28} color={whiteColor} strokeWidth={2} />
            </Text>
            <Text style={styles.CurrFeelsLike}>13° / 6° Feels like 11°</Text>
          </View>
          <View>
            <Image
              style={styles.currWeatherImg}
              source={require('../assets/weather_icons/day/122.png')}
            />
          </View>
        </View>
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

        <View style={styles.textInfoCont}>
          {/* forecast -> forecastday [0] el -> day -> condition -> text  */}
          <Text style={styles.textInfoHeader}>Dry day ahead</Text>
          <Text style={styles.textInfo}>Expect Saturday to be next dry day</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// borderWidth: 1,
// borderColor: '#000',
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BgColor,
  },
  searchCont: {
    width: width * 0.6,
    alignSelf: 'center',
    marginTop: 30,
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
  },

  currInfoCont: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currInfoTextCont: {
    width: 210,
    paddingLeft: 20,
  },
  currDegree: {
    color: whiteColor,
    fontSize: 70,
    fontWeight: '500',
  },
  CurrCondition: {
    color: whiteColor,
    fontSize: 25,
    marginBottom: 25,
  },
  CurrLocation: {
    color: whiteColor,
    fontSize: 22,
    marginBottom: 10,
  },
  CurrFeelsLike: {
    color: whiteColor,
    fontSize: 18,
  },
  currWeatherImg: {
    width: 130,
    height: 150,
    alignItems: 'center',
    position: 'relative',
    right: 35,
  },
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
  textInfoCont: {
    margin: 15,
    borderRadius: 20,
    padding: 15,
    backgroundColor: darkBlue,
    alignItems: 'center',
    paddingVertical: 20,
  },
  textInfoHeader: {
    color: whiteColor,
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 7,
  },
  textInfo: {
    color: whiteColor,
    fontWeight: '400',
    fontSize: 15,
  },
});
