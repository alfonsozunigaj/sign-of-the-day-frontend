import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { List, ListItem, Text, Left, Right, Icon } from 'native-base';
import SignScreen from './SignScreen';
import Error from './elements/Error';

export default class CategoriesScreen extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            display: false,
            activeSections: [],
        }
    }

    async componentWillMount() {
        this.setState({ isLoading: true });
        let data = await this.getCategoriesFromApi();
        this.setState({ data });
        if (data === null) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
        }
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
            return null;
        }
    }

    _renderHeader = section => {
        return (
            <View style={styles.categoryBox}>
                <Left>
                    <Text style={styles.headerText}>{section.title}</Text>
                </Left>
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

    async _onPressItem(date) {
        this.setState({ isLoading: true });
        this.setState({ date: date });
        this.setState({ display: true });
        this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.containerBody}>
                    <ActivityIndicator/>
                </View>
            )
        } else if (this.state.error) {
            return (
                <View style={styles.containerBody}>
                    <Error/>
                </View>
            )
        } else if (this.state.display) {
            return (
                <ScrollView>
                    <TouchableWithoutFeedback onPress={() => this._onPressItem(null)}>
                        <View style={styles.header}>
                            <Icon type="FontAwesome5" name="angle-left" />
                            <Text style={styles.headerText}>Back</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <SignScreen date={this.state.date}/>
                    </View>
                </ScrollView>
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
    containerBody: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor:'white',
        justifyContent: 'center'
    },
    center: {
        alignItems: 'center'
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    categoryBox: {
        paddingVertical: 15,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        alignItems: 'center'
    },
    categoryBody: {
        marginHorizontal: 5,
        paddingHorizontal: 5,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'black'
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
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        paddingLeft: 5,
    }
});
