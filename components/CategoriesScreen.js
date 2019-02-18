import React, {Component} from 'react';
import { ActivityIndicator, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

export default class CategoriesScreen extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            activeSections: [],
        }
    }

    async componentWillMount() {
        this.setState({ isLoading: true });
        let data = await this.getCategoriesFromApi();
        this.setState({ data });
        this.setState({ isLoading: false });
    }

    async getCategoriesFromApi() {
        try {
            let response = await fetch(
                'http://sign-of-the-day.herokuapp.com/api/v1/categories',
            );

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    _renderHeader = section => {
        return (
            <View style={styles.categoryBox}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    };

    _onPressItem(date) {
        this.props.navigation.navigate('Day', { dateString: date });
    }

    _renderContent = section => {
        let items;
        if (section.content.length === 0) {
            items = (
                <View style={styles.categoryItem}>
                    <View style={styles.categoryItemColumn}>
                        <Text style={styles.categoryEmptyItem}>Nothing to see here</Text>
                    </View>
                </View>
            )
        } else {
            items = section.content.map((item) => {
                return (
                    <TouchableOpacity onPress={() => this._onPressItem(item.date)} key={item.title}>
                        <View style={styles.categoryItem}>
                            <View style={styles.categoryItemColumn}>
                                <Text style={styles.categoryItemTitle}>{item.title}</Text>
                            </View>
                            <View style={styles.categoryItemColumn}>
                                <Image resizeMode="cover" source={{ uri: item.demonstration }} style={styles.categoryItemImage} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            });
        }
        return (
            <View style={styles.categoryBody}>
                { items }
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

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
                        <Accordion
                            sections={this.state.data}
                            activeSections={this.state.activeSections}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                            underlayColor='#FBFBF1'
                        />
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
        color: '#9A9A8A',
        marginBottom: 10,
    },
    categoryBox: {
        marginHorizontal: 10,
        marginTop: 5,
        paddingVertical: 5,
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#9A9A8A',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 22,
        color: '#9A9A8A'
    },
    categoryBody: {
        marginHorizontal: 15,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#9A9A8A',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    categoryItem: {
        paddingBottom: 5,
        marginBottom: 5,
        flex: 1,
        flexDirection: 'row',
    },
    categoryItemColumn: {
        flex: 1,
        justifyContent: 'center',
    },
    categoryEmptyItem: {
        fontSize: 16,
        color: '#9A9A8A',
        fontStyle: 'italic',
    },
    categoryItemTitle: {
        fontSize: 22,
        color: '#9A9A8A'
    },
    categoryItemImage: {
        width: 144,
        height: 81,
    },
});
