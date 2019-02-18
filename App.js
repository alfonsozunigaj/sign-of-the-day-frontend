import React, {Component} from 'react';
import { Icon } from 'native-base';
import { createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import CalendarScreen from './components/CalendarScreen';
import DayScreen from "./components/DayScreen";
import CategoriesScreen from './components/CategoriesScreen';


const AppStackNavigator = createBottomTabNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Categories',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="MaterialIcons" active={focused} name="list" />;
            },
        }),
    },
    Calendar: {
        screen: CalendarScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Calendar',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="MaterialIcons" active={focused} name="today" />;
            },
        }),
        tabBarOption: {

        }
    },
    Day: {
        screen: DayScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Today',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="MaterialIcons" active={focused} name="drafts" />;
            },
        }),
    },
},{
    initialRouteName : 'Calendar'
});


export default createAppContainer(AppStackNavigator);



