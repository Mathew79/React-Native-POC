import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SegmentedControlIOS, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { styles, buttonStyles, textStyles } from '../scenes/StyleSheet';
import { FetchTopPaidApps } from '../actions/FetchTopPaidApps';
import { FetchTopFreeApps } from '../actions/FetchTopFreeApps';
import { FetchTopGrossingApps } from '../actions/FetchTopGrossingApps';

import PriceButton from '../components/PriceButton';
import { Navigation } from 'react-native-navigation';




class TopAppsLists extends React.PureComponent {

    static navigatorButtons = {
        rightButtons: [
          {
            icon: require('../../resources/icon1.png'), // for icon button, provide the local image asset name
            id: 'wishlist' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
          }
        ]
      };
   


    constructor(props) {
        super(props)
        this.state = { selectedIndex: 0 };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'wishlist') {
                this.props.navigator.showModal({
                    screen: 'Wishlist',
                    title: "Wish List",
                    passProps: this.props.appData, navigatorStyle: {
                      navBarNoBorder: false,
                      navBarBackgroundColor: '#F2F2F2',
                    },
                    navigatorButtons: {
                      rightButtons: [
                        {
                          title: 'Cancel', // for a textual button, provide the button title (label)
                          id: 'cancel', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                          testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                          buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                          buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                        },
                      ]
                    },
                  })
            }
        }
    }


    componentDidMount() {
        if (this.state.selectedIndex === 0) {
            this.props.fetchPaid();
        }
    }



    render() {

        const navigate = this.props.navigator;

        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#F5F5F5', borderBottomWidth: 1, borderBottomColor: '#9C9C9C', height: 40 }}>
                    <SegmentedControlIOS style={{ marginLeft: 30, marginRight: 30 }}
                        values={['Paid', 'Free', 'Top Grossing']}
                        selectedIndex={this.state.selectedIndex}
                        onChange={(event) => {
                            this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
                            this.segmentChanged(event.nativeEvent.selectedSegmentIndex);
                        }}
                    />

                </View>

                {this.props.processig ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size='small' />
                    </View>
                ) :
                    (
                        this.props.errorOccured ? (
                            <View style={styles.error}>
                                <Text style={{ fontStyle: 'italic' }} >Oops!! There is some problem</Text>
                                <Text style={{ marginTop: 5, color: 'blue', fontWeight: 'bold' }}>TRY AGAIN</Text>
                            </View>
                        ) : (
                                < FlatList style={styles.table}

                                    initialNumToRender={10}

                                    data={this.props.apps}

                                    renderItem={({ item }) =>
                                        <TouchableOpacity underlayColor="white" onPress={() => navigate.push({
                                            screen: 'Details', passProps: { item, navigateFrom: 'Home' }, navigatorStyle: {
                                                navBarNoBorder: false,
                                            },
                                        })}>
                                            <View style={styles.row}>
                                                <Image
                                                    style={styles.logo}
                                                    source={{ uri: item.imageURLString.small }}
                                                />
                                                <View style={{ flex: 3, flexDirection: 'column' }}>
                                                    <Text numberOfLines={2} style={{ marginTop: 5 }}>{item.appName}</Text>
                                                    <Text numberOfLines={1} style={{ marginTop: 2, fontSize: 10, fontWeight: '500' }}>{item.contentType}</Text>
                                                </View>

                                                <PriceButton item={item} disabled={false} />

                                            </View>
                                        </TouchableOpacity>
                                    }

                                    ItemSeparatorComponent={() => <View style={styles.seperator} />}

                                />
                            )
                    )}
            </View>
        )
    }

    segmentChanged(index) {
        switch (index) {
            case 0:
                this.props.fetchPaid();
                break;
            case 1:
                this.props.fetchFree();
                break;
            case 2:
                this.props.fetchGrossing();
                break;
        }
    }
}



function dispatcher(dispatch, status, response) {
    switch (status) {
        case 0:
            dispatch({ type: 'PROCESSING' })
            break;
        case 1:
            dispatch({ type: 'ERROR', error: response })
            break;
        case 2:
            dispatch({ type: 'RECEIVED_TOP_APPS', apps: response })
            break;
        default:
    }
}


mapStateToProps = state => {
    return {
        apps: state.topApps.apps,
        processig: state.topApps.processig,
        errorOccured: state.topApps.errorOccured,
    }
}


function mapDispatchToProps(dispatch) {
    let api_free = new FetchTopFreeApps();
    let action_free = api_free.fetchData();

    let api_paid = new FetchTopPaidApps();
    let action_paid = api_paid.fetchData();

    let api_grossing = new FetchTopGrossingApps();
    let action_grossing = api_grossing.fetchData();


    return {
        fetchFree: () => action_free(dispatch, dispatcher),
        fetchPaid: () => action_paid(dispatch, dispatcher),
        fetchGrossing: () => action_grossing(dispatch, dispatcher),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopAppsLists);



