import React, {Component} from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import DayScreen from "./components/DayScreen";


const AppStackNavigator = createDrawerNavigator({
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



