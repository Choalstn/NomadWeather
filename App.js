import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import React from "react"; 
import {View, Text, StyleSheet} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';

export default function App() {
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>Seoul</Text>
      </View>

      <View style={style.weather}>
        <View style={style.day} >
          <Text style={style.temp}>27</Text>
          <Text style={style.desc}>Sunny</Text>
        </View>
      </View>
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
    flex : 3,
   },

   day : {
    flex: 1,
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