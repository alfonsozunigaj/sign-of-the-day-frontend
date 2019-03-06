import React, {Component} from 'react';
import {StyleSheet, Image, View} from "react-native";
import { Text } from 'native-base';

export default class Error extends Component {
    constructor() {
        super();
    }

    async componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Error</Text>
                <Image resizeMode = 'cover' source={require('./../../assets/images/idk.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
