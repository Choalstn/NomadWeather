import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

const {width : SCREEN_WIDTH} = Dimensions.get('window');

const API_KEY  = '00f28591d749f7f01ce6ce18cb876c1f';

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
    <View style={style.container}>
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
          <View style={style.day}>
          <ActivityIndicator size="large" color="gray" style={{marginTop:10}}/>
         </View>
        )
        :(
          days.map((day, index) => 
          <View style={style.day} key={index}>
            <Text style={style.date}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
            <Text style={style.temp}>{parseFloat(day.temp.day).toFixed(1)}°</Text>
            <Text style={style.desc}>{day.weather[0].main}</Text>
            <Text style={style.tinyDesc}>{day.weather[0].description}</Text>
          </View>
         )
        )}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
   container : {
    flex:1, 
    backgroundColor: '#AFEEEE'
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
   },

   weather : {
   },

   day : {
    width:SCREEN_WIDTH,
    alignItems : 'center', 
   },

   date : {
    fontSize : 30
   },

   temp : {
    marginTop: 40,
    fontSize: 80,
    fontWeight: '500'
   },

   desc : {
    marginTop: 20,
    fontSize : 45,
   },

   tinyDesc : {
    fontSize : 20,
   }
})