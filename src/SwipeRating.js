import React, { Component } from 'react';
import times from 'lodash/times';
import PropTypes from 'prop-types';

import {
  View, Text, Animated, PanResponder, Image,
  StyleSheet, Platform, Dimensions
} from 'react-native';

// RATING IMAGES WITH STATIC BACKGROUND COLOR (white)
const STAR_IMAGE = require('./images/star.png');
const HEART_IMAGE = require('./images/heart.png');
const ROCKET_IMAGE = require('./images/rocket.png');
const BELL_IMAGE = require('./images/bell.png');

const TYPES = {
  star: {
    source: STAR_IMAGE,
    color: '#f1c40f',
    backgroundColor: 'white'
  },
  heart: {
    source: HEART_IMAGE,
    color: '#e74c3c',
    backgroundColor: 'white'
  },
  rocket: {
    source: ROCKET_IMAGE,
    color: '#2ecc71',
    backgroundColor: 'white'
  },
  bell: {
    source: BELL_IMAGE,
    color: '#f39c12',
    backgroundColor: 'white'
  }
};

export default class SwipeRating extends Component {
  static defaultProps = {
    type: 'star',
    ratingImage: require('./images/star.png'),
    ratingColor: '#f1c40f',
    ratingBackgroundColor: 'white',
    ratingCount: 5,
    showReadOnlyText: true,
    imageSize: 40,
    minValue: 0,
    jumpValue: 0,
  };

  constructor(props) {
    super(props);
    const { onStartRating, onSwipeRating, onFinishRating, fractions } = this.props;
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        const newPosition = new Animated.ValueXY();
        const tapPositionX = gesture.x0 - this.state.centerX + gesture.dx;
        newPosition.setValue({ x: tapPositionX, y: 0 });
        if (this.state.isComponentMounted) {
          this.setState({ position: newPosition, value: tapPositionX });
          const rating = this.getCurrentRating(tapPositionX);
          if (typeof onStartRating === 'function') onStartRating(rating);
        }
      },
      onPanResponderMove: (event, gesture) => {
        const newPosition = new Animated.ValueXY();
        const tapPositionX = gesture.x0 - this.state.centerX + gesture.dx;
        newPosition.setValue({ x: tapPositionX, y: 0 });
        if (this.state.isComponentMounted) {
          this.setState({ position: newPosition, value: tapPositionX });
          const rating = this.getCurrentRating(tapPositionX);
          if (typeof onSwipeRating === "function") onSwipeRating(rating);
        }
      },
      onPanResponderRelease: event => {
        const rating = this.getCurrentRating(this.state.value);
        if (rating >= this.props.minValue) {
          if (!fractions) {
            // 'round up' to the nearest rating image
            this.setCurrentRating(rating);
          }
          if (typeof onFinishRating === 'function') onFinishRating(rating);
        }
      }
    });

    this.state = { panResponder, position, display: false, isComponentMounted: false };
  }

  async componentDidMount() {
    try {
      const STAR_IMAGE = await require('./images/star.png');
      const HEART_IMAGE = await require('./images/heart.png');
      const ROCKET_IMAGE = await require('./images/rocket.png');
      const BELL_IMAGE = await require('./images/bell.png');

      this.setState({ display: true, isComponentMounted: true });
    } catch(err) {
      console.log(err)
    }

    this.setCurrentRating(this.props.startingValue);
  }

  componentDidUpdate(prevProps) {
    if (this.props.startingValue !== prevProps.startingValue) {
      this.setCurrentRating(this.props.startingValue);
    }
  }

  handleLayoutChange() {
    this.ratingRef.measure((fx, fy, width, height, px, py) => {
      this.setState({
        centerX: (px % Dimensions.get("window").width) + width / 2,
      });
    });
  }

  getPrimaryViewStyle() {
    const { position } = this.state;
    const { imageSize, ratingCount, type } = this.props;

    const color = TYPES[type].color;

    const width = position.x.interpolate(
      {
        inputRange: [-ratingCount * (imageSize / 2), 0, ratingCount * (imageSize / 2)],
        outputRange: [0, (ratingCount * imageSize) / 2, ratingCount * imageSize],
        extrapolate: 'clamp'
      },
      {
        useNativeDriver: true
      }
    );

    return {
      backgroundColor: color,
      width,
      height: width ? imageSize : 0
    };
  }

  getSecondaryViewStyle() {
    const { position } = this.state;
    const { imageSize, ratingCount, type } = this.props;

    const backgroundColor = TYPES[type].backgroundColor;

    const width = position.x.interpolate(
      {
        inputRange: [-ratingCount * (imageSize / 2), 0, ratingCount * (imageSize / 2)],
        outputRange: [ratingCount * imageSize, (ratingCount * imageSize) / 2, 0],
        extrapolate: 'clamp'
      },
      {
        useNativeDriver: true
      }
    );

    return {
      backgroundColor,
      width,
      height: width ? imageSize : 0
    };
  }

  renderRatings() {
    const { imageSize, ratingCount, type, tintColor } = this.props;
    const source = TYPES[type].source;

    return times(ratingCount, index => (
      <View key={index} style={styles.starContainer}>
        <Image source={source} style={{ width: imageSize, height: imageSize, tintColor }} />
      </View>
    ));
  }

  getCurrentRating(value) {
    // const { value } = this.state;
    const { fractions, imageSize, ratingCount } = this.props;

    const startingValue = ratingCount / 2;
    let currentRating = (this.props.minValue) ? this.props.minValue : 0;

    if (value > (ratingCount * imageSize) / 2) {
      currentRating = ratingCount;
    } else if (value < (-ratingCount * imageSize) / 2) {
      currentRating = (this.props.minValue) ? this.props.minValue : 0;
    } else if (value <= imageSize || value > imageSize) {
      currentRating = startingValue + value / imageSize;
      currentRating = !fractions ? Math.ceil(currentRating) : +currentRating.toFixed(fractions);
    } else {
      currentRating = !fractions ? Math.ceil(startingValue) : +startingValue.toFixed(fractions);
    }
    if (
      this.props.jumpValue > 0 &&
      this.props.jumpValue < this.props.ratingCount
    ) {
      return (
        Math.ceil(currentRating * (1 / this.props.jumpValue)) /
        (1 / this.props.jumpValue)
      );
    } else {
      return currentRating;
    }
  }

  setCurrentRating(rating) {
    const { imageSize, ratingCount } = this.props;

    // `initialRating` corresponds to `startingValue` in the getter. Naming it
    // differently here avoids confusion with `value` below.
    const initialRating = ratingCount / 2;
    let value = null;

    if (rating > ratingCount) {
      value = (ratingCount * imageSize) / 2;
    } else if (rating < 0) {
      value = (-ratingCount * imageSize) / 2;
    } else if (rating < ratingCount / 2 || rating > ratingCount / 2) {
      value = (rating - initialRating) * imageSize;
    } else {
      value = 0;
    }

    const newPosition = new Animated.ValueXY();
    newPosition.setValue({ x: value, y: 0 });
    if (this.state.isComponentMounted) {
      this.setState({position: newPosition, value});
    }
  }

  displayCurrentRating() {
    const { ratingCount, type, readonly, showReadOnlyText, ratingTextColor } = this.props;
    const color = ratingTextColor || TYPES[type].color;

    return (
      <View style={styles.showRatingView}>
        <View style={styles.ratingView}>
          <Text style={[styles.ratingText, { color }]}>Rating:{' '}</Text>
          <Text style={[styles.currentRatingText, { color }]}>{this.getCurrentRating(this.state.value)}</Text>
          <Text style={[styles.maxRatingText, { color }]}>/{ratingCount}</Text>
        </View>
        <View>{readonly && showReadOnlyText && <Text style={[styles.readonlyLabel, { color }]}>(readonly)</Text>}</View>
      </View>
    );
  }

  render() {
    const { readonly, type, ratingImage, ratingColor, ratingBackgroundColor, style, showRating } = this.props;

    if (type === 'custom') {
      let custom = {
        source: ratingImage,
        color: ratingColor,
        backgroundColor: ratingBackgroundColor
      };
      TYPES.custom = custom;
    }

    return (
      this.state.display ?
      <View pointerEvents={readonly ? 'none' : 'auto'} style={style}>
        {showRating && this.displayCurrentRating()}
        <View style={styles.starsWrapper} {...this.state.panResponder.panHandlers}>
          <View style={styles.starsInsideWrapper} onLayout={(e) => {this.handleLayoutChange(e)}} ref={(view) => {this.ratingRef = view;}}>
            <Animated.View style={this.getPrimaryViewStyle()} />
            <Animated.View style={this.getSecondaryViewStyle()} />
          </View>
          {this.renderRatings()}
        </View>
      </View> :
      null
    );
  }

  componentWillUnmount() {
    this.setState({ isComponentMounted: false });
  }

}

const styles = StyleSheet.create({
  starsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsInsideWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showRatingView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  ratingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  ratingText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e'
  },
  readonlyLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495a'
  },
  currentRatingText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null
  },
  maxRatingText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e'
  }
});

const fractionsType = (props, propName, componentName) => {
  if (props[propName]) {
    const value = props[propName];
    if (typeof value === 'number') {
      return value >= 0 && value <= 20
        ? null
        : new Error(`\`${propName}\` in \`${componentName}\` must be between 0 and 20`);
    }

    return new Error(`\`${propName}\` in \`${componentName}\` must be a number`);
  }
};

SwipeRating.propTypes = {
  type: PropTypes.string,
  ratingImage: PropTypes.node,
  ratingColor: PropTypes.string,
  ratingBackgroundColor: PropTypes.string,
  ratingCount: PropTypes.number,
  ratingTextColor: PropTypes.string,
  imageSize: PropTypes.number,
  onStartRating: PropTypes.func,
  onFinishRating: PropTypes.func,
  showRating: PropTypes.bool,
  style: PropTypes.object,
  readonly: PropTypes.bool,
  showReadOnlyText: PropTypes.bool,
  startingValue: PropTypes.number,
  fractions: fractionsType,
  minValue: PropTypes.number
};