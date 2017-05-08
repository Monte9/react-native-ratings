import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ACTION_SCENE_WIDTH = 250
const ACTION_SCENE_HEIGHT = 50

class App extends Component {
  constructor(props) {
    super(props);

    const pan = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
      },
      onPanResponderMove: Animated.event([null, {
        dx: pan.x,
        dy: pan.y,
      }]),
      onPanResponderRelease: (e, {vx, vy}) => {
        pan.flattenOffset();
      }
    })

    this.state = { panResponder, pan };
  }

  getPrimaryViewStyle() {
    let { pan } = this.state;

    const startPoint = ( SCREEN_WIDTH - ACTION_SCENE_WIDTH )/ 2
    const endPoint =  startPoint + ACTION_SCENE_WIDTH

    const width = pan.x.interpolate({
      inputRange: [startPoint, endPoint],
      outputRange: [0, ACTION_SCENE_WIDTH],
      extrapolate: 'clamp'
    })

    return {
      backgroundColor: '#1abc9c',
      width,
      height: ACTION_SCENE_HEIGHT
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actionScene} {...this.state.panResponder.panHandlers}>
          <Animated.View style={this.getPrimaryViewStyle()}>
          </Animated.View>
          <Animated.View style={styles.secondaryView}>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionScene: {
    flexDirection: 'row',
    width: ACTION_SCENE_WIDTH,
    height: ACTION_SCENE_HEIGHT,
    backgroundColor: '#3498db'
  },
  secondaryView: {
    height: ACTION_SCENE_HEIGHT,
    backgroundColor: '#ecf0f1'
  }
});

Expo.registerRootComponent(App);
