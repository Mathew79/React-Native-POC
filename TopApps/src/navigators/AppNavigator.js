import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import TopAppsLists from '../scenes/TopAppsLists';
import AppsDetails from '../scenes/AppsDetails';
import WishList from  '../scenes/WishList';
import ShippingAddress from '../scenes/ShippingAddress';
import Confirmation from '../scenes/Confirmation';


export default function registerScreens(store, Provider) {
	Navigation.registerComponent('Home', () => TopAppsLists, store, Provider);
	Navigation.registerComponent('Details', () => AppsDetails, store, Provider);
	Navigation.registerComponent('Wishlist', () => WishList, store, Provider);
	Navigation.registerComponent('ShippingAddress',() => ShippingAddress, store, Provider)
	Navigation.registerComponent('Confirmation', () => Confirmation,store,Provider)

}

