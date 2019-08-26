import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import TapRatingScreen from './app/screens/TapRatingScreen';
import SwipeRatingScreen from './app/screens/SwipeRatingScreen';

const App = createBottomTabNavigator({
  Tap: {
    screen: TapRatingScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon type="ionicon" name="ios-star-half" size={25} color={tintColor} />;
      },
    },
  },
  Swipe: {
    screen: SwipeRatingScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon type="ionicon" name="ios-star-outline" size={25} color={tintColor} />;
      },
    },
  }
});

export default createAppContainer(App);
