import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

import {View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const {width : SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }

    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5 });
    const location = await  Location.reverseGeocodeAsync({latitude, longitude }, {useGoogleMaps:false});
    setCity(location[0].street);
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
        <View style={style.day} >
          <Text style={style.temp}>27</Text>
          <Text style={style.desc}>Sunny</Text>
        </View>

        <View style={style.day} >
          <Text style={style.temp}>27</Text>
          <Text style={style.desc}>Sunny</Text>
        </View>

        <View style={style.day} >
          <Text style={style.temp}>27</Text>
          <Text style={style.desc}>Sunny</Text>
        </View>
        
        <View style={style.day} >
          <Text style={style.temp}>27</Text>
          <Text style={style.desc}>Sunny</Text>
        </View>
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
    fontSize: 58,
    fontWeight: '900',
   },

   weather : {
   },

   day : {
    width:SCREEN_WIDTH,
    alignItems : 'center', 
   },

   temp : {
    marginTop: 50,
    fontSize: 150,
    fontWeight: '500'
   },

   desc : {
    marginTop: -20,
    fontSize : 45,
   }
})