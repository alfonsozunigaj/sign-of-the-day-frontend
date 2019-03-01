import React, {Component} from 'react';
import {Calendar, LocaleConfig} from "react-native-calendars";
import {ActivityIndicator, Alert, TouchableWithoutFeedback, ScrollView, StyleSheet, View, Text} from "react-native";
import { Icon } from 'native-base';
import SignScreen from './SignScreen';

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
            display: false,
            date: null,
        }
    }

    async componentWillMount() {

        try {
            let response = await fetch(
                'http://daily-sign.herokuapp.com/api/v1/setup',
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
        this.setState({ date: day.dateString });
        this.setState({ display: true });
        this.setState({ loading: false });
    }

    async onBackPress() {
        this.setState({ loading: true });
        this.setState({ date: null });
        this.setState({ display: false });
        this.setState({ loading: false });
    }

    render() {
        let date = new Date();
        let display;

        if (this.state.loading) {
            display = (
                <View style={styles.containerBody}>
                    <ActivityIndicator/>
                </View>
            )
        } else if (this.state.display) {
            display = (
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => this.onBackPress()}>
                        <View style={styles.header}>
                            <Icon type="FontAwesome5" name="angle-left" />
                            <Text style={styles.headerText}>Back</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <SignScreen date={this.state.date}/>
                    </View>
                </ScrollView>
            );
        } else {
            display = (
                <View style={styles.containerBody}>
                    <ScrollView>
                        <Calendar
                            minDate={this.state.initialData.start_date}
                            maxDate={date}
                            style={styles.calendar}
                            onDayPress={(day) => this.onDayPress(day)}
                            theme={{
                                calendarBackground: 'white',
                            }}
                        />
                    </ScrollView>
                </View>
            );
        }
        return display
    }
}

const styles = StyleSheet.create({
    containerBody: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor:'white',
        justifyContent: 'center'
    },
    calendar: {

    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        paddingLeft: 5,
    }
});
