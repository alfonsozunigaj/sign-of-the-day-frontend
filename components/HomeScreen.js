import React, {Component} from 'react';
import {Calendar, CalendarList, LocaleConfig} from "react-native-calendars";
import {StyleSheet, View, ScrollView, ActivityIndicator, Image, Dimensions} from "react-native";
import { Icon } from 'native-base';
import DayScreen from './DayScreen'

export default class HomeScreen extends Component {
    constructor() {
        super();
        LocaleConfig.locales['es'] = {
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'],
            dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            dayNamesShort: ['Dom.','Lun.','Mar.','Mié.','Jue.','Vie.','Sab.']
        };
        LocaleConfig.defaultLocale = 'es';
        this.state = {
            selectionExist: false,
            loading: false,
        }
    }


    onDayPress(day) {
        this.setState({ loading: true });
        if (this.state.selectionExist && this.state.selectionExist.dateString === day.dateString) {
            this.setState({selectionExist: false})
        } else {
            this.setState({selectionExist: day})
        }
        this.setState({ loading: false });
    }


    onDayLongPress(day) {
        this.props.navigation.navigate({
            routeName: 'Day',
            params: {
                day: day
            }
        })
    }


    render() {
        let date = new Date();

        let calendar = (
            <Calendar
                minDate={'2018-05-10'}
                maxDate={date}
                style={styles.calendar}
                onDayPress={(day) => this.onDayPress(day)}
                onDayLongPress={(day) => this.onDayLongPress(day)}
                theme={{
                    calendarBackground: '#FBFBF1',
                }}
            />
        );

        let information;
        if (!this.state.selectionExist){
            information = (
                <View/>
            )
        } else if (this.state.loading) {
            information = (
                <ActivityIndicator/>
            )
        } else {
            information = (
                <Image resizeMode = 'contain' style={styles.image} source={require('./../assets/images/sick.gif')}/>
            )
        }

        return (
            <View style={styles.backContainer}>
                <View style={styles.rounded}>
                    <View style={styles.containerHeader}>
                        <Icon type="FontAwesome5" name="bars" onPress={() => this.props.navigation.toggleDrawer()}/>
                    </View>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.containerCalendar}>
                            { calendar }
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            { information }
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rounded: {
        flex: 1,
        margin: 10,
        paddingVertical: 20,
        backgroundColor:'#FBFBF1',
        borderRadius:10,
    },
    backContainer: {
        flex: 1,
        backgroundColor: '#4b5050',
    },
    containerHeader: {
        paddingHorizontal: 20,
    },
    containerCalendar: {
        paddingVertical: 20,
        backgroundColor:'#FBFBF1',
        justifyContent: 'center'
    },
    calendar: {

    },
    image: {

    },
});
