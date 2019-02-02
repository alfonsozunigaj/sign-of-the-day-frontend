import React, {Component} from 'react';
import {Calendar, LocaleConfig} from "react-native-calendars";
import {StyleSheet, View} from "react-native";

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
    }


    onDayPress(day) {
        this.props.navigation.navigate({
            routeName: 'Day',
            params: {
                day: day
            }
        })
    }


    render() {
        let date = new Date();
        return (
            <View style={styles.container}>
                <Calendar
                    minDate={'2018-05-10'}
                    maxDate={date}
                    style={styles.calendar}
                    onDayPress={(day) => this.onDayPress(day)}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    calendar: {
        width: "100%",
    },
});
