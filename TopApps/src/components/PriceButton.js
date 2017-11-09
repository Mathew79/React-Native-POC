import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, AlertIOS } from 'react-native';
import { buttonStyles, textStyles } from '../scenes/StyleSheet';

class PriceButton extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        const showBuy = this.props.showBuy && (this.props.selectedItemKey == this.props.item.key);

        return (
            <View style={{ flex: 1, width: 60 }}>
                <TouchableOpacity   activeOpacity={ this.props.disabled ? 1 : 0.7}  onPress={ () =>  !this.props.disabled && this.props.buttonPress(this.props, this.props.selectedItemKey, this.props.item)} style={{ alignSelf: 'flex-end', }}>
                    <View style={showBuy ? buttonStyles.amountGreen : buttonStyles.amount } >
                        <Text style={showBuy ? textStyles.amountGreen : textStyles.amount}>{showBuy ? 'Buy' : this.props.item.price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


PriceButton.propTypes = {
    item: PropTypes.object.isRequired,
    showAmount: PropTypes.bool,
    showBuy: PropTypes.bool,
    buttonPress: PropTypes.func,
};


const mapStateToProps = state => ({
    showAmount: state.priceButton.showAmount,
    showBuy: state.priceButton.showBuy,
    selectedItemKey: state.priceButton.selectedItemKey,
});


const mapDispatchToProps = dispatch => ({
    buttonPress: (state, selectedItemKey, item) => {
        if (state.showBuy) {
            if (selectedItemKey == item.key)
                dispatch({ type: "SHOW_AMOUNT" })
            else
                dispatch({ type: "SHOW_BUY", item: item })
        }
        else if (state.showAmount) {
            dispatch({ type: "SHOW_BUY", item: item })

        }
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceButton);


