import React, {Component} from 'react';
import {Calendar, LocaleConfig} from "react-native-calendars";
import {ActivityIndicator, Alert, ScrollView, StyleSheet, View} from "react-native";
import {Icon} from 'native-base';
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
            selection: null,
            loading: false,
            data: null,
        }
    }


    async onDayPress(day) {
        this.setState({ loading: true });

        let data = await this.getPhraseFromApi(day.dateString);
        if (!data.error){
            this.setState({selection: day});
            this.setState({ data });
        }

        this.setState({ loading: false });
    }


    async getPhraseFromApi(date) {
        try {
            let response = await fetch(
                'http://sign-of-the-day.herokuapp.com/api/v1/phrases/' + date,
            );

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }


    async onBackPress() {
        this.setState({ selection: null });
        this.setState({ data: null });
    }


    render() {
        let date = new Date();
        let display;
        let header;

        if (this.state.loading) {
            display = (
                <ActivityIndicator/>
            )
        } else if (this.state.data === null) {
            display = (
                <Calendar
                    minDate={'2018-05-10'}
                    maxDate={date}
                    style={styles.calendar}
                    onDayPress={(day) => this.onDayPress(day)}
                    theme={{
                        calendarBackground: '#FBFBF1',
                    }}
                />
            );
            header = (
                <Icon type="FontAwesome5" name="bars" style={styles.icon} onPress={() => this.props.navigation.toggleDrawer()}/>
            );
        } else {
            display = (
                <DayScreen day={this.state.selection} data={this.state.data}/>
            );
            header = (
                <Icon type="FontAwesome5" name="arrow-left" style={styles.icon} onPress={() => this.onBackPress()}/>
            );
        }

        return (
            <View style={styles.backContainer}>
                <View style={styles.rounded}>
                    <View style={styles.containerHeader}>
                        { header }
                    </View>
                    <ScrollView>
                        <View style={styles.containerBody}>
                            { display }
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
    containerBody: {
        paddingVertical: 10,
        backgroundColor:'#FBFBF1',
        justifyContent: 'center'
    },
    calendar: {

    },
    image: {

    },
    icon: {
        color: '#9A9A8A'
    }
});
