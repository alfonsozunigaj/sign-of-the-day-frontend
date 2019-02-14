import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, Image, StyleSheet, Text, View, ScrollView} from "react-native";

export default class DayScreen extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const day = this.props.day;
        const data = this.props.data;
        this.setState({ day });
        this.setState({ data });
    }

    render() {
        let indexer = 0;
        let definitions = this.state.data.definitions.map((item) => {
            indexer++;
            return (
                <Text key={item.id} style={styles.definition}>{indexer}. {item.definition}</Text>
            )
        });
        let translations = this.state.data.translations.map((item) => {
            return (
                <Text key={item.id} style={styles.definition}>{item.language}: {item.translation}</Text>
            )
        });
        return (
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
        );
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
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
    wordContainer:{
        flexDirection: 'column',
        flex: 1
    },
    item2:{
        flexDirection:'column',
        flex: 1
    }
});
