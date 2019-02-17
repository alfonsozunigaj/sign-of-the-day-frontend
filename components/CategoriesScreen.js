import React, {Component} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';

export default class CategoriesScreen extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false
        }
    }

    async componentWillMount() {

    }

    render() {
        let display;
        if (this.state.isLoading) {
            display = (
                <View style={styles.containerBody}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            display = (
                <View style={styles.containerBody}>
                    <Text style={styles.title}>Categories</Text>
                    <ScrollView>
                        <Text>Element</Text>
                    </ScrollView>
                </View>
            )
        }

        return (
            <View style={styles.backContainer}>
                <View style={styles.rounded}>
                    { display }
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
        backgroundColor: '#FBFBF1',
        borderRadius: 10,
    },
    backContainer: {
        flex: 1,
        backgroundColor: '#4b5050',
    },
    containerBody: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor:'#FBFBF1',
        justifyContent: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#9A9A8A'
    },
});
