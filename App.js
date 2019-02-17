import React, {Component} from 'react';
import { Icon } from 'native-base';
import { createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import CalendarScreen from './components/CalendarScreen';
import DayScreen from "./components/DayScreen";
import CategoriesScreen from './components/CategoriesScreen';


const AppStackNavigator = createBottomTabNavigator({
    Calendar: {
        screen: CalendarScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Calendar',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="FontAwesome5" active={focused} name="calendar" />;
            },
        }),
        tabBarOption: {

        }
    },
    Day: {
        screen: DayScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Day',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="FontAwesome5" active={focused} name="sun" />;
            },
        }),
    },
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Categories',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="FontAwesome5" active={focused} name="list" />;
            },
        }),
    },
});


export default createAppContainer(AppStackNavigator);



