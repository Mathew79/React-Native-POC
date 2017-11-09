import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SegmentedControlIOS, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { styles } from '../scenes/StyleSheet';
import PriceButton from '../components/PriceButton';


import { saveToStore, hasItemInStore, fetchWishListFromStrore ,totalAmount} from '../actions/WishListStore';

class WishList extends React.PureComponent {

    constructor(props) {
        super(props)
        this.props.navigator.setStyle({
            navBarBackgroundColor: '#2B3169',
            navBarTextColor : 'white',
            navBarButtonColor : '#FFF476'
          });

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.getWishList()
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'cancel') {
                this.props.navigator.dismissModal({
                    animationType: 'slide-down'
                });
            }
        }
    }

    render() {
        const navigate = this.props.navigator;
        return (
            <View style={styles.container}>

                {this.props.isfetching ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size='small' />
                    </View>
                ) :
                    (
                        this.props.count > 0 ?
                            (<View style={{ flex: 1 }}>
                                <View style={{ borderBottomColor: 'red', borderBottomWidth: 0, backgroundColor: '#2B3169' }}>
                                    <Text style={{ marginLeft: 20, marginRight: 20, fontStyle: 'italic', fontWeight: 'normal', marginBottom: 5, marginTop: 5, color: 'white' }}>This app is created for educational purposes only. You can buy/get apps from Appstore app.  </Text>
                                </View>
                                <View style={{ backgroundColor: '#2B3169' }}>
                                        <View style={{ height: 80, margin: 20,  marginTop: 5, borderWidth: 0, borderRadius: 5, backgroundColor: '#333A79' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ flex: 0, marginTop: 15, marginLeft: 10, color : '#848BAF' }}>Total number of items : </Text>
                                                <Text style={{ flex: 0, marginTop: 10, fontWeight: '600', fontSize: 20, color :'#ECEFF4' }}>{this.props.count}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ marginTop: 10, marginLeft: 10,color : '#848BAF' }}>Total amount :</Text>
                                                <Text style={{ flex: 0, marginTop: 5, fontWeight: '600', fontSize: 20 ,color :'#ECEFF4'}}>{this.props.totalAmount(this.props.items)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                <View style={{ flex: 1, marginTop: 10 }}>
                                    < FlatList style={styles.table}

                                        initialNumToRender={10}

                                        data={this.props.items}

                                        renderItem={({ item }) =>
                                            <TouchableOpacity underlayColor="white" onPress={() => navigate.push({
                                                screen: 'Details', passProps: { item, navigateFrom: 'Wishlist' }, navigatorStyle: {
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

                                                    <PriceButton item={item} disabled={true} />

                                                </View>
                                            </TouchableOpacity>
                                        }
                                        ItemSeparatorComponent={() => <View style={styles.seperator} />}
                                    />
                                    <View style={{ height:60,  backgroundColor: '#2B3169' }}>
                                    <TouchableOpacity  onPress={() => navigate.push({
                                                screen: 'ShippingAddress', passProps: {  navigateFrom: 'Wishlist' }, navigatorStyle: {
                                                    navBarNoBorder: false,screenBackgroundColor: '#2B3169'
                                                },
                                            })}>
                                    <View style={{ alignItems : 'center',justifyContent : 'center', height: 40, margin: 10, marginLeft: 20, marginRight: 20, borderWidth: 1, borderRadius: 5, borderColor: 'black', backgroundColor: '#FFF476', }}>
                                        <Text style = {{ fontWeight: '500' , fontSize : 20, color :'#2B3169' }}>Checkout</Text>
                                        </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            )
                            :
                            (<View style={styles.loading}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 25 }}>Wish List</Text>
                                <Text style={{ color: 'gray', fontWeight: 'normal', fontSize: 14, marginTop: 10 }}>You don't currently have anything in your Wish List</Text>
                            </View>)
                    )
                }
            </View>
        )
    }
}


WishList.propTypes = {
    isPresentInStore: PropTypes.bool.isRequired,
    saveItem: PropTypes.func.isRequired,
    wishList: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    isPresentInStore: state.wishList.isPresentInStore,
    isfetching: state.wishList.isfetching,
    items: state.wishList.items,
    count: state.wishList.count
});


const mapDispatchToProps = dispatch => ({
    saveItem: (item) => saveToStore(item, dispatch),
    getWishList: () => fetchWishListFromStrore(dispatch),
    wishList: () => dispatch({ type: 'Wishlist' }),
    totalAmount:(items) => totalAmount(items),
});


export default connect(mapStateToProps, mapDispatchToProps)(WishList);




