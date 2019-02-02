import React, {Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import DayScreen from "./components/DayScreen";


const AppStackNavigator = createStackNavigator({
    Calendar: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            header: null
        }),
    },
    Day: {
        screen: DayScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Day',
        }),
    },
});


export default createAppContainer(AppStackNavigator);



