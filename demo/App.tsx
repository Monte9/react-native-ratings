import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TapRatingScreen from './src/TapRatingScreen';
import SwipeRatingScreen from './src/SwipeRatingScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'TapRating') {
              iconName = 'ios-star-half';
            } else if (route.name === 'SwipeRating') {
              iconName = 'ios-star-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="TapRating" component={TapRatingScreen} />
        <Tab.Screen name="SwipeRating" component={SwipeRatingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}