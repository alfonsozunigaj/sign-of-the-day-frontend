import React, {Component} from 'react';
import {ActivityIndicator, Alert, Dimensions, Image, StyleSheet, View, ScrollView} from "react-native";
import { Text } from 'native-base'

export default class SignScreen extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        this.setState({ loading: true });
        let dateString = this.props.date;
        let data = await this.getPhraseFromApi(dateString);
        if (data.error) {
            data = await this.getPhraseFromApi(new Date());
        }
        await this.setState({ data });
        this.setState({ loading: false })
    }

    async getPhraseFromApi(date) {
        try {
            let response = await fetch(
                'http://daily-sign.herokuapp.com/api/v1/phrases/' + date,
            );

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (this.state.loading){
            return (
                <View style={styles.containerBody}>
                    <ActivityIndicator/>
                </View>
            )
        }
        let definition = (
            <Text style={styles.definition}>
                {this.state.data.translations[0].definition}
            </Text>
        );
        let translations = this.state.data.translations.map((item) => {
            return (
                <Text key={item.id} style={styles.definition}>
                    <Text style={styles.bold}>{item.language}</Text>: {item.translation}
                </Text>
            )
        });
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.state.data.translations[0].translation}</Text>
                    <View>
                        { definition }
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
    containerBody: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor:'white',
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
