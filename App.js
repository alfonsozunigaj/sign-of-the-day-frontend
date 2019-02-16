import React, {Component} from 'react';
import { createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import CalendarScreen from './components/CalendarScreen';
import DayScreen from "./components/DayScreen";


const AppStackNavigator = createBottomTabNavigator({
    Calendar: {
        screen: CalendarScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Calendar',
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



