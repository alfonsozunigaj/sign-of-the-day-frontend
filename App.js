import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import CalendarScreen from './components/CalendarScreen';
import SignScreen from "./components/SignScreen";
import CategoriesScreen from './components/CategoriesScreen';
import AboutScreen from "./components/AboutScreen";

const AppStackNavigator = createBottomTabNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Categories',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="FontAwesome5" name="list" style={{ color:  tintColor }} />;
            },
        }),
    },
    Calendar: {
        screen: CalendarScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Calendar',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon solid type="FontAwesome5" name="calendar" style={{ color:  tintColor }} />;
            },
        }),
    },
    Sign: {
        screen: SignScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Today',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon solid type="FontAwesome5" name="envelope-open" style={{ color:  tintColor }} />;
            },
        }),
    },
    About: {
    screen: AboutScreen,
        navigationOptions: ({ navigation }) => ({
        title: 'About',
        header: null,
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon type="FontAwesome5" name="info" style={{ color:  tintColor }} />;
        },
    }),
},
},{
    initialRouteName : 'Calendar',
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            activeTintColor: '#6ac0cf'
        }
    }
});


const AppContainer = createAppContainer(AppStackNavigator);

export default class App extends Component{
    render() {
        return(
            <View style={styles.backContainer}>
                <View style={styles.rounded}>
                    <AppContainer/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backContainer: {
        flex: 1,
        backgroundColor: '#6ac0cf',
    },
    rounded: {
        flex: 1,
        margin: 10,
        paddingVertical: 20,
        backgroundColor:'white',
        borderRadius:10,
    },
});



