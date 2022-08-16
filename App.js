import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Fontisto } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

const {width : SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY  = '00f28591d749f7f01ce6ce18cb876c1f';

const icons = {
  "Clouds" : "cloudy",
  "Clear" : "day-sunny",
  "Rain" : "rains",
  "Snow" : "snow",
  "Drizzle" : "rain",
  "Thunderstorm" : "lightnings",
  "Atmosphere" : "cloudy-gusts",
}

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }

    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5 });
    const location = await  Location.reverseGeocodeAsync({latitude, longitude }, {useGoogleMaps:false});
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays (json.daily);
  }

  useEffect(() => {
    getWeather();
  }, [])
  
  

  return (
    <LinearGradient colors={["#ee9ca7", "#ffdde1"]} style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>{city}</Text> 
      </View>

      <ScrollView 
      contentContainerStyle={style.weather} 
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator = 'false'
      >
        {days.length == 0 
        ?(
          <View style={style.indicator}>
          <ActivityIndicator size="large" color="gray" style={{marginTop:10}}/>
         </View>
        )
        :(
          days.map((day, index) => 
          <View style={style.day} key={index}>
            <Text style={style.date}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
            <View 
            style={{
              flexDirection:"row",
              alignItems:'center',
              width:"100%",
              justifyContent : "space-between"
              }}>
                
            <Text style={style.temp}>{parseFloat(day.temp.day).toFixed(1)}°</Text>
            <Fontisto name={icons[day.weather[0].main]} size={48} color="gray" style={{marginRight:25, marginTop:-40}}/>
            </View>
            <Text style={style.desc}>{day.weather[0].main}</Text>
            <Text style={style.tinyDesc}>{day.weather[0].description}</Text>
          </View>
         )
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
   container : {
    flex:1, 
    //backgroundColor: '#AFEEEE'
   },

   city : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
   },

   cityName : {
    marginTop: 20,
    fontSize: 68,
    fontWeight: '700',
    color:'white'
   },

   weather : {
   },

   day : {
    width:SCREEN_WIDTH,
    alignItems : 'flex-start',
    paddingHorizontal : 30 
   },

   indicator : {
    width:SCREEN_WIDTH,
    alignItems : 'center',
   },

   date : {
    fontSize : 25,
    color:'white'
   },

   temp : {
    marginTop: 0,
    fontSize: 80,
    fontWeight: '600',
    color:'white'
   },

   desc : {
    marginTop: -10,
    color:'white',
    fontSize : 30,
   },

   tinyDesc : {
    marginTop: -2,
    fontSize : 20,
    color:'white'
   }
})