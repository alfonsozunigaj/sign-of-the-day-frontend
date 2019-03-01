import React, {Component} from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, ScrollView } from "react-native";
import { Text } from 'native-base';

export default class AboutScreen extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        }
    }

    async componentWillMount() {
    }

    async getPhraseFromApi() {

    }

    render() {
        if (this.state.loading){
            return (
                <View style={styles.containerBody}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Daily Sign</Text>
                        <Text style={styles.subtitle}>About Us</Text>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    containerBody: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    bold: {
        fontWeight: 'bold'
    },
});