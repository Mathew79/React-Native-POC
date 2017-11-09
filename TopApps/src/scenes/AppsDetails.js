import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InAppPurchaseButton from '../components/InAppPurchaseButton';
import PriceButton from '../components/PriceButton';

import { buttonStyles, textStyles } from '../scenes/StyleSheet'

class AppsDetails extends React.Component {

    
    render() {
        const appData = this.props.item;
        const navigator = this.props.navigator;

        return (

            <ScrollView style={styles.container} stickyHeaderIndices={[1]} >

                <View style={{ flex: 0, flexDirection: 'row', height: 130 }}>
                    <Image
                        style={styles.logo}
                        source={{ uri: appData.imageURLString.large }}
                    />

                    <View style={{ flex: 1, flexDirection: 'column', height: 100, }}>
                        <Text style={styles.title}> {appData.appName} </Text>
                        <Text style={styles.subtitle}> {appData.artist} </Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.copyrights}> {appData.copyRights} </Text>
                            <PriceButton item={appData}  disabled = {false}/>
                        </View>

                    </View>
                </View>

                <InAppPurchaseButton appData={appData} navigator={navigator}  isWishlist = {this.props.navigateFrom === 'Wishlist'}/>

                <Text style={{ flex: 0, marginRight: 10, marginBottom: 0, marginLeft: 20, marginTop: 20, fontWeight: 'bold', }} >Discription</Text>
                <Text style={{ flex: 1, marginRight: 20, marginBottom: 10, marginLeft: 20, marginTop: 10, justifyContent: 'center' }} >{appData.summary}</Text>
            </ScrollView>
        )
    }
}



export default connect()(AppsDetails)



const styles = StyleSheet.create({
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        width: 100,
        height: 100,
        marginLeft: 15,
        marginTop: 15,
        marginRight: 15,
    },
    title: {
        flex: 0,
        fontSize: 20,
        right: 0,
        left: 0,
        marginTop: 15,
        fontWeight: '400',
    },
    subtitle: {
        flex: 0,
        fontSize: 15,
        right: 0,
        left: 0,
        marginTop: 5,
        fontWeight: '100',
    },
    copyrights: {
        flex: 1,
        fontSize: 8,
        right: 0,
        left: 0,
        marginTop: 20,
    },
})