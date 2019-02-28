import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import { createAppContainer, createDrawerNavigator, createBottomTabNavigator, createNavigationContainer } from 'react-navigation';
import CalendarScreen from './components/CalendarScreen';
import SignScreen from "./components/SignScreen";
import CategoriesScreen from './components/CategoriesScreen';


const AppStackNavigator = createBottomTabNavigator({
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
    Calendar: {
        screen: CalendarScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Calendar',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="FontAwesome5" active={focused} name="calendar" />;
            },
        }),
    },
    Sign: {
        screen: SignScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Today',
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type="FontAwesome5" active={focused} name="envelope-open" />;
            },
        }),
    },
},{
    initialRouteName : 'Categories',
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            activeTintColor: '#6ac0cf',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 1,
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



