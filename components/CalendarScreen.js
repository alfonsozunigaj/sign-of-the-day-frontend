import React, {Component} from 'react';
import {Calendar, LocaleConfig} from "react-native-calendars";
import {ActivityIndicator, Alert, ScrollView, StyleSheet, View} from "react-native";

export default class CalendarScreen extends Component {
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
            loading: true,
        }
    }

    async componentWillMount() {

        try {
            let response = await fetch(
                'http://sign-of-the-day.herokuapp.com/api/v1/setup',
            );
            let initialData = await response.json();
            this.setState({ initialData });
            this.setState({ loading: false })

        } catch (error) {
            console.error(error);
        }

    }

    async onDayPress(day) {
        this.setState({ loading: true });
        this.props.navigation.navigate('Day', { dateString: day.dateString });
        this.setState({ loading: false });
    }

    render() {
        let date = new Date();
        let display;

        if (this.state.loading) {
            display = (
                <ActivityIndicator/>
            )
        } else {
            display = (
                <ScrollView>
                    <Calendar
                        minDate={this.state.initialData.start_date}
                        maxDate={date}
                        style={styles.calendar}
                        onDayPress={(day) => this.onDayPress(day)}
                        theme={{
                            calendarBackground: '#FBFBF1',
                        }}
                    />
                </ScrollView>
            );
        }
        return (
            <View style={styles.backContainer}>
                <View style={styles.rounded}>
                    <View style={styles.containerBody}>
                        { display }
                    </View>
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
    containerBody: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor:'#FBFBF1',
        justifyContent: 'center'
    },
    calendar: {

    },
});
