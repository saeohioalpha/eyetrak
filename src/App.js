/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import {connect} from "react-redux"

import Home from './Home'
import CemeraScreen from './CameraScreen'
import MovingScreen from './MovingScreen'
import Settings from './Settings'
import { ActionChangeColor, ActionChangeSize, ActionChangeSpeed, ActionChangeDirection,ActionChangeDelay,ActionChangeCycle, ActionChangeActiveColor, ActionChangeActiveSize } from './reducers/index.js';
const ConnectMovingScreen = connect(MapStateForMovingScreen)(MovingScreen)

const MapStateForMovingScreen = state => {
  const {settings} = state
  return {
    ...settings
  }
}
const MapStateForSettings = state => {
  const {settings} = state
  return {
    ...settings
  }
}

const MapActionsforSettings = dispatch => {
  return {
      changeColor: color => {
        dispatch({type:ActionChangeColor,payload:color})
      },
      changeSize: size => {
        dispatch({type:ActionChangeSize,payload:size})
      },
      changeSpeed: speedValue => {
        dispatch({type:ActionChangeSpeed,payload:speedValue})
      },
      
      changeDelay:delay => {
        dispatch({type:ActionChangeDelay,payload:delay})
      },
      changeCycle:cycle => {
        dispatch({type:ActionChangeCycle,payload:cycle})
      },
      modifyPath:(payload) => {
        dispatch({type:ActionChangeDirection,payload})
      },

      changeActiveColorIndex :(index) => {
          dispatch({type:ActionChangeActiveColor,payload:index})
      },

      changeActiveSizeIndex: (index) => {
        dispatch({type:ActionChangeActiveSize,payload:index})
      }
      
  }
}

const ConnectSettings = connect(MapStateForSettings,MapActionsforSettings)(Settings)

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  CemeraScreen: {
    screen: CemeraScreen,
    navigationOptions: { 
      headerTitleStyle: { alignSelf: 'center' },
      title: 'Center Title',
      gesturesEnabled: true,
    },
  },
  MovingScreen: {
    screen:ConnectMovingScreen,
  },
  Settings: {
    screen:ConnectSettings,
    navigationOptions: { 
      headerTitleStyle: { alignSelf: 'center' },
      title: 'Center Title',
      gesturesEnabled: true,
    },
  }
}, 
{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#05bbd3',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign:"center"
      },
    },
});
export default createAppContainer(AppNavigator);


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
      <AppNavigator />
    );
   
  }
}






