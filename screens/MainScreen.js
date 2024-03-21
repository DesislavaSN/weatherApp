/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BgColor, darkBlue, whiteColor } from '../assets/colors/colors';
import { ChevronLeftIcon, MapPinIcon } from 'react-native-heroicons/outline';
import HourlyWeather from '../components/HourlyWeather';
import DailyWeather from '../components/DailyWeather';
import Loading from '../components/Loading';
const { width, height } = Dimensions.get('screen');
import { fetchCurrentWeather, fetchForecastPerDay } from '../api/weatherdb';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default function MainScreen({ navigation }) {
  const { params: city } = useRoute();
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast1Day, setForecast1Day] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [localTime, setLocalTime] = useState('');
  const [isDay, setIsDay] = useState(1);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    getCurrWeatherData();
    getForecast1DayWeatherData();
  }, []);

  const getCurrWeatherData = async () => {
    const data = await fetchCurrentWeather({
      q: city.city,
    });
    if (data && data.data) {
      setCurrentWeather(data.data);
      setIsDay(data?.current?.is_day);
      setLocalTime(data?.location?.localtime?.slice(11));
    }
  };

  const getForecast1DayWeatherData = async () => {
    const data = await fetchForecastPerDay({
      q: city.city,
      days: 1,
    });
    if (data && data.data) {
      setForecast1Day(data);
      setHourlyWeather(data.data?.forecast?.forecastday[0]?.hour);
    }
  };

  // console.log('==>==>', currentWeather?.location?.name);

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.backBtnCont}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon size={30} color={darkBlue} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.CurrLocation}>
              {currentWeather?.location?.name}{' '}
              <MapPinIcon size={28} color={'#124076'} strokeWidth={2.5} />
            </Text>
          </View>
          <View style={styles.currInfoCont}>
            <View style={styles.currInfoTextCont}>
              <Text style={styles.currDegree}>
                {Math.round(currentWeather?.current?.temp_c)} °
              </Text>
              <Text style={styles.CurrCondition}>
                {currentWeather?.current?.condition.text}
              </Text>
              <Text style={styles.CurrFeelsLike}>
                {Math.round(
                  forecast1Day?.data?.forecast?.forecastday[0]?.day?.maxtemp_c,
                )}
                ° /{' '}
                {Math.round(
                  forecast1Day?.data?.forecast?.forecastday[0]?.day?.mintemp_c,
                )}
                ° Feels like {Math.round(currentWeather?.current?.feelslike_c)}°
              </Text>
            </View>
            <View>
              <Image
                style={styles.currWeatherImg}
                // source={require('../assets/weather_icons/day/122.png')}
                source={{
                  uri: `https:${currentWeather?.current?.condition?.icon}`,
                }}
              />
            </View>
          </View>

          {/* hourly weather component */}
          <HourlyWeather
            hourlyWeather={hourlyWeather}
            time={localTime}
            currWeather={currentWeather}
          />

          <View style={styles.textInfoCont}>
            <Text style={styles.textInfoHeader}>Daily information</Text>
            <Text style={styles.textInfo}>
              {forecast1Day?.data?.forecast?.forecastday[0]?.day?.condition?.text}
            </Text>
            <Text style={styles.textInfo}>
              {isDay === 1
                ? `Don't miss the sunset at ${forecast1Day?.data?.forecast?.forecastday[0]?.astro?.sunset}`
                : `Wake up with the sunrise at ${forecast1Day?.data?.forecast?.forecastday[0]?.astro?.sunrise}`}
            </Text>
          </View>

          {/* daily weather componenty */}
          <DailyWeather city={city.city} />

          <View style={styles.shortInfo}>
            <View style={styles.shortInfoConts}>
              <FontAwesomeIcon name="sun" size={35} color="yellow" style={styles.icon} />
              <Text style={styles.shortInfoHeader}>UV Index</Text>
              <Text style={styles.shortInfoText}>Low</Text>
            </View>
            <View style={styles.shortInfoConts}>
              <FeatherIcon name="wind" size={35} color="#607274" style={styles.icon} />
              <Text style={styles.shortInfoHeader}>Wind</Text>
              <Text style={styles.shortInfoText}>23 km/h</Text>
            </View>
            <View style={styles.shortInfoConts}>
                <EntypoIcon name="drop" size={35} color="blue" style={styles.icon} />
              <Text style={styles.shortInfoHeader}>Humidity</Text>
              <Text style={styles.shortInfoText}>59%</Text>
            </View>
            <View style={styles.shortInfoConts2}>
              <View style={styles.innerContShortInfo2}>
                <FeatherIcon name="sunrise" size={30} color="yellow" />
                <Text style={styles.shortInfoHeader2}>Sunrise</Text>
                <Text style={styles.shortInfoText2}>6:32</Text>
              </View>
              <View style={styles.innerContShortInfo2}>
                <FeatherIcon name="sunset" size={30} color="red" />
                <Text style={styles.shortInfoHeader2}>Sunset</Text>
                <Text style={styles.shortInfoText2}>18:21</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    // )

  );
}

// borderWidth: 1,
// borderColor: '#000',
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BgColor,
  },
  backBtnCont: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginLeft: 20,
  },
  currInfoCont: {
    marginTop: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currInfoTextCont: {
    width: 210,
    paddingLeft: 20,
  },
  currDegree: {
    marginBottom: 18,
    color: whiteColor,
    fontSize: 80,
    fontWeight: '500',
  },
  CurrCondition: {
    color: whiteColor,
    fontSize: 25,
    marginBottom: 15,
  },
  CurrLocation: {
    // color: darkBlue,
    color: '#124076',
    fontSize: 30,
    marginLeft: width * 0.1,
    fontWeight: '600',
    fontFamily: 'Ubuntu-Bold',
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
  shortInfo: {
    height: 370,
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  shortInfoConts: {
    width: width * 0.45,
    height: height * 0.20,
    margin: 10,
    backgroundColor: darkBlue,
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: height * 0.04,
  },
  shortInfoConts2: {
    width: width * 0.45,
    height: height * 0.20,
    margin: 10,
    backgroundColor: darkBlue,
    borderRadius: 20,
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  innerContShortInfo2: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 7,
  },
  shortInfoHeader: {
    color: whiteColor,
    fontSize: 21,
    fontWeight: '700',

  },
  shortInfoText : {
    fontSize: 18,
    fontWeight: '500',
    color: '#607274',
  },
  shortInfoHeader2: {
    color: whiteColor,
    fontSize: 18,
    fontWeight: '500',

  },
  shortInfoText2: {
    fontSize: 16,
    fontWeight: '500',
    color: '#607274',
  },
});
