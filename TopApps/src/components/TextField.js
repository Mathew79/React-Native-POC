
'use strict'
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import update from 'immutability-helper';

import { buttonStyles, textStyles, styles, addressStyles } from '../scenes/StyleSheet'
import validate from '../util/Validator';
import format from '../util/Formatter';

export default class TextField extends React.PureComponent {
    useValidator = true;
    useFormatter = true;

    constructor(props) {
        super(props)
        if (this.props.useValidator != 'undefined' && this.props.useValidator == false) {
            useValidator = false;
        }

        if (this.props.useFormatter != 'undefined' && this.props.useFormatter == false) {
            useFormatter = false;
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={this.props.styles.label}>{this.props.label}
                    {(this.props.object.mandatory ? <Text style={{ color: 'yellow' }}>*</Text> : null)}
                </Text>
                <TextInput autoCorrect={false}
                    style={this.props.styles.input}
                    value={this.props.object.text}
                    onChangeText={(text) => this.props.propsChanged(this.newText(this.props.object, text, this.props.identifier))}
                    onEndEditing={() => this.props.propsChanged(this.validate(this.props.object, null, this.props.identifier))}
                />
                {(this.props.object.showError ?
                    <Text style={this.props.styles.error}>
                        {this.props.object.error}
                    </Text>
                    : null)}

            </View>
        )
    }

    newText(currentProps, newValue, identifier = null) {
        let newState = update(currentProps, {
            text: {
                $set: newValue
            },
            valid: {
                $set: this.validate(currentProps, newValue, identifier).valid
            },
            showError: { $set: false },
            error: { $set: '' }
        });
        return newState;
    }


    validate(currentProps, newValue = null, identifier = null) {
        let value

        if (newValue != null && newValue != 'undefined') {
            value = newValue
        }
        else {
            value = currentProps.text
        }

        let valid, err = '';
        if (currentProps.mandatory) {
            valid = (value.length > 0)
        }
        else {
            valid = true;
        }

        if (valid && this.useValidator) {
            if (identifier != 'undefined' && identifier != null &&
                value != null && value != 'undefined' && value.length > 0) {
                let [v, e] = validate(value, identifier);
                valid = v
                err = e
            }
        }
        else {
            err = 'Field should not be empty';
        }

        let newState = update(currentProps, {
            valid: {
                $set: valid
            },
            showError: {
                $set: !valid
            },
            error: {
                $set: err
            }

        });
        return newState;
    }


    format(text, key) {

    }
}