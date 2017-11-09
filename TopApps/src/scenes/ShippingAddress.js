import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Image, Button,
    KeyboardAvoidingView, TextInput, ScrollView, NativeModules
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InAppPurchaseButton from '../components/InAppPurchaseButton';
import PriceButton from '../components/PriceButton';

import { buttonStyles, textStyles, styles, addressStyles } from '../scenes/StyleSheet'
import TextField from '../components/TextField';
import FaceView from '../components/FaceView';
import update from 'immutability-helper';

class ShippingAddress extends React.PureComponent {

    constructor(props) {
        super(props)

        this.props.navigator.setStyle({
            screenBackgroundColor: '#2B3169',
            navBarButtonColor: '#FFF476'
        });


        let initialState = {
            firstName: { text: '', mandatory: true, valid: false, showError: false, error: '' },
            middleName: { text: '', mandatory: false, valid: true, showError: false, error: '' },
            lastName: { text: '', mandatory: true, valid: false, showError: false, error: '' },
            street: { text: '', mandatory: true, valid: false, showError: false, error: '' },
            city: { text: '', mandatory: false, valid: true, showError: false, error: '' },
            postalCode: { text: '', mandatory: true, valid: false, showError: false, error: '' },
            state: { text: '', mandatory: true, valid: false, showError: false, error: '' },
            face: { text: '', mandatory: false, valid: true,  }
        }

        this.state = initialState;
    }

    render() {

        const navigator = this.props.navigator;


        return (
            <View style={{ flex: 1, backgroundColor: '#2B3169' }}>
                <KeyboardAvoidingView keyboardVerticalOffset={60} behavior="padding" style={{
                    flex: 1, backgroundColor: '#2B3169',
                }}>


                    <ScrollView style={{ flex: 1, backgroundColor: '#2B3169' }}>

                        <View style={{
                            paddingTop: 10, alignItems: 'center'
                        }}>
                            <FaceView style={{ width: 100, height: 100, borderWidth: 1, borderRadius: 50, overflow: 'hidden' }} />
                        </View>



                        <View style={{
                            margin: 20, backgroundColor: '#333A79',
                            borderWidth: 0, borderRadius: 10, paddingBottom: 10
                        }}>
                            <TextField styles={addressStyles} object={this.state.firstName} label='First name' propsChanged={(value) => this.setState({ firstName: value })} />
                            <TextField styles={addressStyles} object={this.state.middleName} label='Middle name' propsChanged={(value) => this.setState({ middleName: value })} />
                            <TextField styles={addressStyles} object={this.state.lastName} label='Last name' propsChanged={(value) => this.setState({ lastName: value })} />
                        </View>

                        <View style={{
                            margin: 20, backgroundColor: '#333A79',
                            borderWidth: 0, borderRadius: 10, paddingBottom: 10
                        }}>
                            <TextField styles={addressStyles} object={this.state.street} label='Street' identifier='street' propsChanged={(value) => this.setState({ street: value })} />
                            <TextField styles={addressStyles} object={this.state.city} label='City' identifier='city' propsChanged={(value) => this.setState({ city: value })} />
                            <TextField styles={addressStyles} object={this.state.state} label='State' propsChanged={(value) => this.setState({ state: value })} />
                            <TextField styles={addressStyles} object={this.state.postalCode} label='Postal code' identifier='postalCode' propsChanged={(value) => this.setState({ postalCode: value })} />
                        </View>

                    </ScrollView>

                </KeyboardAvoidingView>


                <View style={{ height: 60, backgroundColor: '#2B3169' }}>
                    <TouchableOpacity disabled={disabled(this.state)}  onPress={() => { showConfirm(this.state,this.props.navigator) }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 40, margin: 10, marginLeft: 20, marginRight: 20, borderWidth: 1, borderRadius: 5, borderColor: 'black', backgroundColor: '#FFF476', }}>
                            <Text style={[{ fontWeight: '500', fontSize: 20 }, (disabled(this.state) ? { color: 'gray' } : { color: '#2B3169' })]}>Checkout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



export default connect()(ShippingAddress)


function disabled(state) {
    return !(state.firstName.valid && state.middleName.valid && state.lastName.valid && state.street.valid &&
        state.city.valid && state.postalCode.valid && state.state.valid)
}


async function showConfirm(state,navigator) {
    let imageUrl = await NativeModules.RNTFaceManager.imageUrl()
    let newState = update(state, {
        face: {
            text: {
                $set: imageUrl + "?" + Math.random()
            },
        }
    });

    navigator.push({
        screen: 'Confirmation',title : 'Confirmation', passProps: { newState, navigateFrom: 'ShippingAddress' }, navigatorStyle: {
            navBarNoBorder: false,
        },
    })

}