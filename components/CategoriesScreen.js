import React, {Component} from 'react';
import { ActivityIndicator, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { List, ListItem, Text, Left, Right, Icon } from 'native-base';

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
                'http://daily-sign.herokuapp.com/api/v1/categories',
            );

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    _onPressItem(date) {

    }

    _renderHeader = section => {
        return (
            <View style={styles.categoryBox}>
                <Left>
                    <Text style={styles.headerText}>{section.title}</Text>
                </Left>
                <Right>
                    <Icon name="arrow-forward" style={styles.headerText} />
                </Right>
            </View>
        );
    };

    _renderContent = section => {
        let items;
        if (section.content.length === 0) {
            items = (
                <View style={styles.categoryItem}>
                    <Left>
                        <Text style={styles.categoryEmptyItem}>Nothing to see here</Text>
                    </Left>
                </View>
            )
        } else {
            items = section.content.map((item) => {
                return (
                    <TouchableOpacity onPress={() => this._onPressItem(item.date)} key={item.title}>
                        <View style={styles.categoryItem}>
                            <Left>
                                <Text style={styles.categoryItemTitle}>{item.title}</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" style={styles.headerText} />
                            </Right>
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
        if (this.state.isLoading) {
            return (
                <View style={styles.containerBody}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            return (
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
    }
}

const styles = StyleSheet.create({
    rounded: {
        flex: 1,
        margin: 10,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    backContainer: {
        flex: 1,
        backgroundColor: '#6ac0cf',
    },
    containerBody: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 75,
        backgroundColor:'white',
        justifyContent: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryBox: {
        marginHorizontal: 10,
        paddingVertical: 15,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
    },
    categoryBody: {
        marginLeft: 15,
    },
    categoryItem: {
        marginLeft: 10,
        marginRight: 10,
        paddingVertical: 15,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        alignItems: 'center'
    },
    categoryEmptyItem: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    categoryItemTitle: {
        fontSize: 16,
    },
});
