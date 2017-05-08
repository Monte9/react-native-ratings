var _ = require('lodash');

import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Dimensions, Image } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const STAR_IMAGE = require('./images/star.png');
const HEART_IMAGE = require('./images/heart.png');
const ROCKET_IMAGE = require('./images/rocket.png');
const BELL_IMAGE = require('./images/bell.png');

const STAR_WIDTH = 60

const TYPES = {
  star: {
    source: STAR_IMAGE,
    color: '#f1c40f',
    backgroundColor: 'black'
  },
  heart: {
    source: HEART_IMAGE,
    color: '#e74c3c',
    backgroundColor: 'black'
  },
  rocket: {
    source: ROCKET_IMAGE,
    color: '#2ecc71',
    backgroundColor: 'black'
  },
  bell: {
    source: BELL_IMAGE,
    color: '#f39c12',
    backgroundColor: 'black'
  },
}

export default class Rating extends Component {
  static defaultProps = {
    type: 'star',
    ratingImage: require('./images/star.png'),
    ratingColor: '#f1c40f',
    ratingBackgroundColor: 'white',
    ratingCount: 5,
    imageSize: STAR_WIDTH,
    bottomBorderRadius: 0,
    topBorderRadius: 0,
    onFinishRating: () => (console.log("Attach a function here."))
  }

  setOffset(value) {
    const { imageSize, ratingCount } = this.props

    const ratingWidth = ratingCount * imageSize
    const startingPoint = (SCREEN_WIDTH - (ratingCount * imageSize)) / 2
    const endingPoint = startingPoint + ratingWidth

    if(value > endingPoint) {
      return endingPoint
    } else if(value < startingPoint) {
      return startingPoint
    } else {
      return value
    }
  }
  constructor(props) {
    super(props);

    const { ratings, imageSize, ratingCount, onFinishRating } = this.props

    const pan = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        pan.setOffset({
          x: this.setOffset(this.state.pan.x._value),
          y: this.state.pan.y._value
        });
      },
      onPanResponderMove: (e, gestureState) => {
        this.setState({ value: this.state.pan.x._value });
        Animated.event([null, {dx: pan.x,
        dy: pan.y}])(e, gestureState);
      },
      onPanResponderRelease: (e, {vx, vy}) => {
        pan.flattenOffset();
        const startValue = this.state.previousValue || 0
        this.setState({ previousValue : Math.floor(startValue + this.state.value / imageSize) })
        onFinishRating(this.getCurrentRating())
      }
    });

    this.state = { panResponder, pan };
  }

  getBackgroundViewStyle() {
    const { position } = this.state

    const color = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4],
      outputRange: ['rgba(231, 76, 60, 1)', 'rgba(46, 204, 113, 1)', 'rgba(255, 0, 255, 1)']
    })

    const opacity = position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT],
      outputRange: [0, 1, 0]
    })

    return {
      backgroundColor: color,
      opacity
    }
  }


  getPrimaryViewStyle() {
    const { pan } = this.state;
    const { ratings, imageSize, ratingCount, type } = this.props

    const color = TYPES[type].color
    const actionSceneWidth = ratingCount * imageSize

    const startPoint = ( SCREEN_WIDTH - actionSceneWidth )/ 2
    const endPoint =  startPoint + actionSceneWidth

    const width = pan.x.interpolate({
      inputRange: [startPoint, endPoint],
      outputRange: [0, actionSceneWidth],
      extrapolate: 'clamp'
    })

    return {
      backgroundColor: color,
      width,
      height: width ? imageSize : 0,
    }
  }

  renderRatings() {
    const { ratings, imageSize, ratingCount, type } = this.props
    const source = TYPES[type].source

    return (
      _(ratingCount).times((index) => (
        <View key={index} style={styles.starContainer}>
          <Image source={source} style={{ width: imageSize, height: imageSize }} />
        </View>
      ))
    )
  }

  getCurrentRating() {
    const { value, previousValue } = this.state
    const { imageSize, ratingCount } = this.props

    let currentRating = 0
    const startValue = previousValue || 0

    const current =
    Math.ceil(startValue) === Math.ceil(value / imageSize) ? Math.ceil(startValue) : Math.ceil(startValue + value / imageSize)

    if (value > ratingCount * imageSize) {
      currentRating = ratingCount
    } else if (value >= imageSize || value <= ratingCount * imageSize) {
      currentRating = current
    } else if (value < -ratingCount * imageSize) {
      currentRating = 0
    }

    return currentRating
  }

  displayCurrentRating() {
    const { ratingCount, type } = this.props

    const color = TYPES[type].color

    return (
      <View style={styles.ratingView}>
        <Text style={styles.ratingText}>Rating: </Text>
        <Text style={[styles.currentRatingText, { color }]}>{this.getCurrentRating()}</Text>
        <Text style={styles.maxRatingText}>/{ratingCount}</Text>
      </View>
    )
  }

  render() {
    const {
      type,
      ratingImage,
      ratingColor,
      ratingBackgroundColor,
      style,
      showRating,
      imageSize,
      ratingCount,
      bottomBorderRadius,
      topBorderRadius
    } = this.props

    if (type === 'custom') {
      custom = {
        source: ratingImage,
        color: ratingColor,
        backgroundColor: ratingBackgroundColor,
      }
      TYPES.custom = custom
    }

    return (
      <View style={style}>
        {showRating && this.displayCurrentRating()}
        <View
          style={styles.starsWrapper}
          {...this.state.panResponder.panHandlers}
        >
          <View
            style={[
              styles.starsInsideWrapper,
              { backgroundColor: TYPES[type].backgroundColor, width: imageSize * ratingCount, height: imageSize }
            ]}
          >
            <Animated.View
              style={[
                this.getPrimaryViewStyle(),
                { borderBottomRightRadius: bottomBorderRadius, borderTopRightRadius: topBorderRadius }
              ]}
            />
          </View>
          {this.renderRatings()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  starsWrapper: {
    flexDirection: 'row',
  },
  starsInsideWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  ratingText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
    color: '#34495e'
  },
  currentRatingText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
  },
  maxRatingText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
    color: '#34495e'
  }
});
