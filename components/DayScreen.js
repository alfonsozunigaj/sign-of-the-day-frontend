import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, Image, StyleSheet, Text, View, ScrollView} from "react-native";

export default class DayScreen extends Component {
    constructor() {
        super();
    }

    async componentWillMount(): void {
        const day = this.props.navigation.getParam('day', null);
        this.setState({ day });
    }

    render() {
        if (!this.state.day) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Sick</Text>
                    <View style={styles.subcontainer}>
                        <Text style={styles.subtitle}>Definitions</Text>
                        <Text style={styles.definition}>1. Affected by physical or mental illness.</Text>
                        <Text style={styles.definition}>2. Feeling nauseous and wanting to vomit.</Text>
                    </View>
                    <View style={styles.imageView}>
                        <Image resizeMode = 'contain' style={styles.image} source={require('./../assets/images/sick.gif')}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    subcontainer: {
        paddingTop: 10,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#46defc'
    },
    subtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#46defc'
    },
    definition: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    imageView: {
        alignItems: 'center',
    },
    image: {
        width: width * 0.95,
    },
});
