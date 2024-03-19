/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
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
import HourlyWeather from '../components/HourlyWeather';
import DailyWeather from '../components/DailyWeather';
import { fetchCurrentWeather, fetchForecastPerDay } from '../api/weatherdb';
const { width, height } = Dimensions.get('screen');

// import Icon from 'react-native-vector-icons/FontAwesome';

export default function MainScreen() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast1Day, setForecast1Day] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [isDay, setIsDay] = useState(1);
  const [localTime, setLocalTime] = useState('');
  const [localDate, setLocalDate] = useState('');
  const [city, setCity] = useState('');

  async function handleSearch(value) {
    if (value && value.length > 3) {
      setCity(value);
      const getCurrWeatherData = await fetchCurrentWeather({
        q: value,
      });
      if (getCurrWeatherData && getCurrWeatherData.data) {
        setCurrentWeather(getCurrWeatherData.data);
        setIsDay(currentWeather?.current?.is_day);
        setLocalTime(currentWeather?.location?.localtime?.slice(11,));
        setLocalDate(currentWeather?.location?.localtime?.slice(0, 10));
      }
      const getForecast1DayWeatherData = await fetchForecastPerDay({
        q: value,
        days: 1,
      });
      // console.log('1 day Forecast IS ------', forecast1DayWeatherData.data.forecast.forecastday);
      if (getForecast1DayWeatherData && getForecast1DayWeatherData?.data) {
        setForecast1Day(getForecast1DayWeatherData?.data?.forecast?.forecastday[0]);
        setHourlyWeather(getForecast1DayWeatherData?.data?.forecast?.forecastday[0]?.hour);
      }
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
            <Text style={styles.currDegree}>{currentWeather?.current?.temp_c} °</Text>
            <Text style={styles.CurrCondition}>{currentWeather?.current?.condition.text}</Text>
            <Text style={styles.CurrLocation}>{currentWeather?.location?.name}{' '}
              <MapPinIcon size={28} color={whiteColor} strokeWidth={2} />
            </Text>
            <Text style={styles.CurrFeelsLike}>{Math.round(forecast1Day?.day?.maxtemp_c)}° / {Math.round(forecast1Day?.day?.mintemp_c)}° Feels like {Math.round(currentWeather?.current?.feelslike_c)}°</Text>
          </View>
          <View>
            <Image
              style={styles.currWeatherImg}
              // source={require('../assets/weather_icons/day/122.png')}
              source={{ uri: `https:${currentWeather?.current?.condition?.icon}` }}
            />
          </View>
        </View>

        {/* hourly weather componenty */}
        <HourlyWeather data={hourlyWeather} time={localTime} currWeather={currentWeather} />

        <View style={styles.textInfoCont}>
          {/* forecast -> forecastday [0] el -> day -> condition -> text  */}
          <Text style={styles.textInfoHeader}>Daily information</Text>
          <Text style={styles.textInfo}>{forecast1Day?.day?.condition?.text}</Text>
          <Text style={styles.textInfo}>
            {isDay === 1 ? 
              `Don't miss the sunset at ${forecast1Day?.astro?.sunset}` : 
              `Wake up with the sunrise at ${forecast1Day?.astro?.sunrise}`
            }
          </Text>
        </View>

        {/* daily weather componenty */}
        <DailyWeather date={localDate} city={city} />
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
    width: width * 0.7,
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
    color: greyBlue,
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
