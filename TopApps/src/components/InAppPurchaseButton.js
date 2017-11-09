import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';

import { saveToStore, hasItemInStore, removeFromStore } from '../actions/WishListStore';


class InAppPurchaseButton extends React.PureComponent {

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }



  onNavigatorEvent(event) {
    if (event.type == 'ScreenChangedEvent') {
      if (event.id == 'willAppear') {
        const isinList = this.props.hasInStore(this.props.appData.key)
      }
    }
  }


  render() {
    return (
      <TouchableOpacity onPress={
        this.props.isWishlist ?
          () => this.props.removeItem(this.props.appData, this.props.navigator)
          :
          this.props.isPresentInStore ? () => this.props.navigator.showModal({
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
          }) : () => this.props.saveItem(this.props.appData)} >
        <View style={{
          flex: 1, flexDirection: 'column', marginLeft: 20, marginRight: 20, height: 40,
          backgroundColor: this.props.isWishlist ? 'red' : this.props.isPresentInStore ? 'green' : '#ef553a', borderColor: '#ebeef0', borderWidth: 1,
          borderRadius: 10, alignItems: 'center', justifyContent: 'center'
        }}>
          <Text style={{ flex: 0, textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'white' }}>{this.props.isWishlist ? 'Remove' : this.props.isPresentInStore ? 'Check out from Wish List' : 'Add to Wish List'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}



InAppPurchaseButton.propTypes = {
  isPresentInStore: PropTypes.bool.isRequired,
  saveItem: PropTypes.func.isRequired,
  appData: PropTypes.object.isRequired,
  wishList: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};



const mapStateToProps = state => ({
  isPresentInStore: state.wishList.isPresentInStore,
});


const mapDispatchToProps = dispatch => ({
  saveItem: (item) => saveToStore(item, dispatch),
  removeItem: (item, navigator) => {
    removeFromStore(item, dispatch);
    navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
    });
  },
  hasInStore: (key) => hasItemInStore(key, dispatch),
  wishList: () => dispatch({ type: 'Wishlist' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InAppPurchaseButton);


