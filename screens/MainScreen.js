/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/outline';
import HourlyWeather from '../components/HourlyWeather';
import DailyWeather from '../components/DailyWeather';
import Loading from '../components/Loading';
const { width, height } = Dimensions.get('screen');
import { fetchCurrentWeather, fetchForecastPerDay } from '../api/weatherdb';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default function MainScreen({ navigation }) {
  const { params: city } = useRoute();
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast1Day, setForecast1Day] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [localTime, setLocalTime] = useState('');
  const [isDay, setIsDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdate] = useState('');
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const today = new Date();
  const [readMore, setReadMore] = useState(false);
  const [allHours, setAllHours] = useState([]);


  useEffect(() => {
    setLoading(true);
    getCurrWeatherData();
    getForecast1DayWeatherData();
  }, []);

  const getCurrWeatherData = async () => {
    const data = await fetchCurrentWeather({
      q: city.city.trim(),
    });
    // console.log(data.data);
    if (data && data.data) {
      setLoading(false);
      setCurrentWeather(data.data);
      setIsDay(data.data?.current?.is_day);
      setLocalTime(data.data?.location?.localtime);
      setLastUpdate(data.data?.location?.localtime?.slice(-5, -3));
    }
  };

  const getForecast1DayWeatherData = async () => {
    const data = await fetchForecastPerDay({
      q: city.city.trim(),
      days: 2,
      alerts: 'yes',
    });

    if (data && data.data) {
      setLoading(false);
      setForecast1Day(data);
      setHourlyWeather(data.data?.forecast?.forecastday[0]?.hour);
      setWeatherAlerts(data.data?.alerts?.alert);

      data.data?.forecast?.forecastday.map(day => {
        day.hour.map(el => {
          setAllHours(prev => [...prev, el]);
        });
      });
    }
  };

  // console.log('======== ', allHours);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.backBtnCont}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon size={30} color={darkBlue} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.CurrLocation}>
              {currentWeather.location?.name}{' '}
              <FontAwesome6Icon name="location-dot" size={28} color="#124076" />
            </Text>
          </View>
          <View style={styles.currInfoCont}>
            <View style={styles.currInfoTextCont}>
              <Text style={styles.currDegree}>
                {Math.round(currentWeather.current?.temp_c)} °
              </Text>
              <Text style={styles.CurrCondition}>
                {currentWeather.current?.condition.text}
              </Text>
              <Text style={styles.CurrFeelsLike}>
                {Math.round(
                  forecast1Day.data?.forecast?.forecastday[0]?.day?.maxtemp_c,
                )}
                ° /{' '}
                {Math.round(
                  forecast1Day.data?.forecast?.forecastday[0]?.day?.mintemp_c,
                )}
                ° Feels like {Math.round(currentWeather?.current?.feelslike_c)}°
              </Text>
              <Text style={styles.CurrFeelsLike}>{today.toString().slice(0, 3)}, {today.toString().slice(4, 10)}, {localTime.slice(-5)}</Text>
            </View>
            <View>
              <Image
                style={styles.currWeatherImg}
                source={{
                  uri: `https:${currentWeather.current?.condition?.icon}`,
                }}
              />
            </View>
          </View>

          {weatherAlerts.length !== 0 && (
            <View style={styles.alerts}>
              <View style={styles.alertsHeader}>
                <FontAwesome5Icon name="exclamation-triangle" size={24} color={whiteColor} style={{ marginRight: 10 }} />
                <Text style={styles.alertsHeaderText}>Severe weather alerts</Text>
              </View>
              <Text style={[styles.alertsText, { marginLeft: 38 }]}>{weatherAlerts[0].event}</Text>
              <TouchableOpacity onPress={() => setReadMore(isOpen => !isOpen)} style={styles.downBtnCont}>
                <Text style={styles.alertsBtnText}>Read more</Text>
                {!readMore ? (
                  <ChevronDownIcon size={20} color={'lightgrey'} strokeWidth={4} />
                ) : (
                  <ChevronUpIcon size={20} color={'lightgrey'} strokeWidth={4} />
                )}
              </TouchableOpacity>
              {readMore ? (
                <View>
                  <Text style={styles.alertsText}>{weatherAlerts[0].desc}</Text>
                </View>
              ) : null}
            </View>
          )}

          {/* hourly forecast component */}
          <HourlyWeather
            hourlyWeather={hourlyWeather}
            currWeather={currentWeather}
            lastUpdated={lastUpdated}
            allHours={allHours}
          />

          <View style={styles.textInfoCont}>
            <Text style={styles.textInfoHeader}>Daily information</Text>
            <Text style={styles.textInfo}>
              {forecast1Day.data?.forecast?.forecastday[0]?.day?.condition?.text}
            </Text>
            <Text style={styles.textInfo}>
              {isDay === 1
                ? `Don't miss the sunset at ${forecast1Day.data?.forecast?.forecastday[0]?.astro?.sunset.slice(1,)}`
                : `Wake up with the sunrise at ${forecast1Day.data?.forecast?.forecastday[0]?.astro?.sunrise.slice(1,)}`}
            </Text>
          </View>

          {/* daily forecast componenty */}
          <DailyWeather city={city.city} />

          <View style={styles.shortInfo}>
            <View style={styles.shortInfoConts}>
              <FontAwesome6Icon name="sun" size={35} color="yellow" style={styles.icon} />
              <Text style={styles.shortInfoHeader}>UV Index</Text>
              <Text style={styles.shortInfoText}>
                {forecast1Day.data?.current?.uv <= 3 ? 'Low' :
                  forecast1Day.data?.current?.uv >= 4 ? 'Midium' :
                    forecast1Day.data?.current?.uv <= 6 ? 'Midium' : 'High'}
              </Text>
            </View>
            <View style={styles.shortInfoConts}>
              <FeatherIcon name="wind" size={35} color="#607274" style={styles.icon} />
              <Text style={styles.shortInfoHeader}>Wind</Text>
              <Text style={styles.shortInfoText}>{forecast1Day.data?.current?.wind_kph} km/h</Text>
            </View>
            <View style={styles.shortInfoConts}>
              <EntypoIcon name="drop" size={35} color="blue" style={styles.icon} />
              <Text style={styles.shortInfoHeader}>Humidity</Text>
              <Text style={styles.shortInfoText}>{forecast1Day.data?.current?.humidity}%</Text>
            </View>
            <View style={styles.shortInfoConts2}>
              <View style={styles.innerContShortInfo2}>
                <FeatherIcon name="sunrise" size={30} color="yellow" style={styles.icon} />
                <Text style={styles.shortInfoHeader2}>Sunrise</Text>
                <Text style={styles.shortInfoText2}>{forecast1Day.data?.forecast?.forecastday[0]?.astro?.sunrise.slice(1,)}</Text>
              </View>
              <View style={styles.innerContShortInfo2}>
                <FeatherIcon name="sunset" size={30} color="red" style={styles.icon} />
                <Text style={styles.shortInfoHeader2}>Sunset</Text>
                <Text style={styles.shortInfoText2}>{forecast1Day.data?.forecast?.forecastday[0]?.astro?.sunset.slice(1,)}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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
    color: '#124076',
    fontSize: 30,
    marginLeft: width * 0.1,
    fontWeight: '600',
    fontFamily: 'Ubuntu-Bold',
  },
  CurrFeelsLike: {
    color: whiteColor,
    fontSize: 18,
    marginBottom: 5,
  },
  currWeatherImg: {
    width: 130,
    height: 150,
    alignItems: 'center',
    position: 'relative',
    right: 35,
  },
  alerts: {
    margin: 15,
    borderRadius: 20,
    padding: 15,
    backgroundColor: darkBlue,
  },
  alertsHeader: {
    flexDirection: 'row',
  },
  alertsHeaderText: {
    color: whiteColor,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  alertsText: {
    color: whiteColor,
    marginBottom: 18,
    textAlign: 'justify',
  },
  downBtnCont: {
    flexDirection: 'row',
  },
  alertsBtnText: {
    color: 'lightgrey',
    marginBottom: 9,
    fontWeight: '600',
    marginRight: 10,
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
    fontWeight: '700',
    fontSize: 17,
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
  shortInfoText: {
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
