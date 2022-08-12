import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import React from "react"; 
import {View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const {width : SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>Seoul</Text>
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
    fontWeight: 'bold',
   },

   weather : {
   },

   day : {
    width:SCREEN_WIDTH,
    alignItems : 'center', 
   },

   temp : {
    marginTop: 50,
    fontSize: 170,
   },

   desc : {
    marginTop: -20,
    fontSize : 45,
   }
})