import React, {Component} from 'react';
import {ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, View, ScrollView} from "react-native";
import { NavigationEvents } from 'react-navigation'

export default class DayScreen extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        this.setState({ loading: true });
        let dateString = this.props.navigation.getParam('dateString', null);
        if (dateString === null) {
            dateString = this.currentDate();
        }
        let data = await this.getPhraseFromApi(dateString);
        this.setState({ data });
        this.setState({ loading: false })
    }

    currentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10)
        {
            dd='0'+dd;
        }

        if(mm<10)
        {
            mm='0'+mm;
        }
        return yyyy+'-'+mm+'-'+dd;
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

    render() {
        if (this.state.loading){
            return (
                <View style={styles.backContainer}>
                    <View style={styles.rounded}>
                        <View style={styles.container}>
                            <ActivityIndicator/>
                        </View>
                    </View>
                </View>
            )
        }
        let indexer = 0;
        let definitions = this.state.data.definitions.map((item) => {
            indexer++;
            return (
                <Text key={item.id} style={styles.definition}>
                    <Text style={styles.bold}>{indexer}</Text>. {item.definition}
                </Text>
            )
        });
        let translations = this.state.data.translations.map((item) => {
            return (
                <Text key={item.id} style={styles.definition}>
                    <Text style={styles.bold}>{item.language}</Text>: {item.translation}
                </Text>
            )
        });
        return (
            <View style={styles.backContainer}>
                <NavigationEvents
                    onWillFocus={payload => {
                        this.componentWillMount();
                    }}
                />
                <View style={styles.rounded}>
                    <ScrollView>
                        <View style={styles.container}>
                            <Text style={styles.title}>{this.state.data.phrase}</Text>
                            <View>
                                { definitions }
                            </View>
                            <View style={styles.imageView}>
                                <Image resizeMode = 'contain' style={styles.image} source={{ uri: this.state.data.demonstration }}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Translations</Text>
                                <View>
                                    { translations }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }
}

const {width} = Dimensions.get('window');
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
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#9A9A8A'
    },
    subtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#9A9A8A'
    },
    definition: {
        fontSize: 16,
        fontStyle: 'italic'
    },
    imageView: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    image: {
        width: width * 0.9,
        height: width * 0.5,
    },
    bold: {
        fontWeight: 'bold'
    },
});
