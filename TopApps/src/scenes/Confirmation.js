import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Image, Button,
    KeyboardAvoidingView, TextInput, ScrollView, NativeModules
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Confirmation extends React.Component {


    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#2B3169' }}>
                <View style={{ borderBottomColor: 'red', paddingBottom: 20, backgroundColor: '#2B3169', paddingTop: 20 }}>
                    <Text style={{ marginLeft: 20, marginRight: 20, fontStyle: 'italic', fontWeight: 'normal', marginBottom: 5, marginTop: 5, color: 'white' }}>This app is created for educational purposes only. You can buy/get apps from Appstore app.  </Text>
                </View>


                <View style={{ backgroundColor: '#2B3169', paddingTop: 20 }}>
                    <Text style={{ marginLeft: 20, marginRight: 20, fontStyle: 'normal', fontWeight: 'bold', color: 'white' }}>Items shipped to :</Text>
                </View>

                <View style={{
                    margin: 40, backgroundColor: '#333A79', marginTop: 20,
                    borderWidth: 0, borderRadius: 10, paddingBottom: 10
                }}>

                    <View style={{
                        paddingTop: 10, alignItems: 'center'
                    }}>
                        <Image source={{ uri: this.props.newState.face.text }} style={{ width: 100, height: 100, borderWidth: 1, borderRadius: 50, overflow: 'hidden', marginBottom: 20 }} />


                        <Text style={{ marginTop: 5, color: 'white', fontWeight: 'normal' }}>{this.props.newState.firstName.text} {this.props.newState.middleName.text} {this.props.newState.lastName.text}</Text>
                        <Text style={{ marginTop: 5, color: 'white', fontWeight: 'normal' }}>{this.props.newState.street.text}, {this.props.newState.city.text} {this.props.newState.state.text}</Text>
                        <Text style={{ marginTop: 5, color: 'white', fontWeight: 'normal' }}>{this.props.newState.postalCode.text}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#2B3169', paddingTop: 20, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { this.props.navigator.resetTo({ screen: 'Home', title: 'Top Charts', navigatorStyle: { navBarNoBorder: true, navBarBackgroundColor: '#F2F2F2', } }) }}>
                        <Text style={{ marginLeft: 20, marginRight: 20, fontStyle: 'normal', fontWeight: 'bold', color: 'white' }}>Go to Home</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}

export default connect()(Confirmation)


