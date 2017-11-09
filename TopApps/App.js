/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import AppReducer from './src/reducers/index';
import  registerScreens from './src/navigators/AppNavigator';

import { Navigation  } from 'react-native-navigation';

store = createStore(AppReducer, {}, applyMiddleware(thunk));

registerScreens(store, Provider)


export default class App extends Component {

  constructor(props){
    super(props);
    Navigation.startSingleScreenApp({
			screen: {
        screen: 'Home',
        title: 'Top Charts',
        navigatorStyle :{
          navBarNoBorder :true,
          navBarBackgroundColor:  '#F2F2F2',
        },
      }
		});
  }
}


