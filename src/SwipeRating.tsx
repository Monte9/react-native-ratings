import React, { Component } from "react";
import times from "lodash/times";

import {
  View,
  Text,
  Animated,
  PanResponder,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  StyleProp,
  ViewStyle
} from "react-native";

// RATING IMAGES WITH STATIC BACKGROUND COLOR (white)
const STAR_IMAGE = require( "./images/star.png" );
const HEART_IMAGE = require( "./images/heart.png" );
const ROCKET_IMAGE = require( "./images/rocket.png" );
const BELL_IMAGE = require( "./images/bell.png" );

const TYPES = {
  star: {
    source: STAR_IMAGE,
    color: "#f1c40f",
    backgroundColor: "white"
  },
  heart: {
    source: HEART_IMAGE,
    color: "#e74c3c",
    backgroundColor: "white"
  },
  rocket: {
    source: ROCKET_IMAGE,
    color: "#2ecc71",
    backgroundColor: "white"
  },
  bell: {
    source: BELL_IMAGE,
    color: "#f39c12",
    backgroundColor: "white"
  },
  custom: {}
};

const fractionsType: any = ( props, propName, componentName ) => {
  if ( props[propName] ) {
    const value = props[propName];

    if ( typeof value === "number" ) {
      return value >= 0 && value <= 20 ?
        null :
        new Error(
            `\`${propName}\` in \`${componentName}\` must be between 0 and 20`
          );
    }

    return new Error(
      `\`${propName}\` in \`${componentName}\` must be a number`
    );
  }
};

export type SwipeRatingProps = {

  /**
   * Graphic used for represent a rating
   *
   * Default is 'star'
   */
  type?: string;

  /**
   * Pass in a custom image source; use this along with type='custom' prop above
   */
  ratingImage?: React.ReactNode;

  /**
   * Pass in a custom fill-color for the rating icon; use this along with type='custom' prop above
   *
   * Default is '#f1c40f'
   */
  ratingColor?: string;

  /**
   * Pass in a custom background-fill-color for the rating icon; use this along with type='custom' prop above
   *
   * Default is 'white'
   */
  ratingBackgroundColor?: string;

  /**
   * Number of rating images to display
   *
   * Default is 5
   */
  ratingCount?: number;

  /**
   * Color used for the text labels
   */
  ratingTextColor?: string;

  /**
   * The size of each rating image
   *
   * Default is 50
   */
  imageSize?: number;

  /**
   * Callback method when the user starts rating.
   */
  onStartRating?: Function;

  /**
   * Callback method when the user finishes rating. Gives you the final rating value as a whole number
   */
  onFinishRating?: Function;

  /**
   * Displays the Built-in Rating UI to show the rating value in real-time
   *
   * Default is false
   */
  showRating?: boolean;

  /**
   * Exposes style prop to add additonal styling to the container view
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Whether the rating can be modiefied by the user
   *
   * Default is false
   */
  readonly?: boolean;

  /**
   * Whether the text is read only
   *
   * Default is false
   */
  showReadOnlyText?: boolean;

  /**
   * The initial rating to render
   *
   * Default is ratingCount/2
   */
  startingValue?: number;

  /**
   * The number of decimal places for the rating value; must be between 0 and 20
   */
  fractions?: typeof fractionsType;

  /**
   * The minimum value the user can select
   *
   * Default is 0
   */
  minValue?: number;

  /**
   * Callback method when the user is swiping.
   */
  onSwipeRating?: ( number ) => void;

  /**
   * Color used for the background
   */
  tintColor?: string;

  /**
   * The number to jump per swipe
   * Default is 0 (not to jump)
   */
  jumpValue?: number;
};

type SwipeRatingState = {
  isComponentMounted: boolean;
  position: any;
  value?: number;
  centerX?: number;
  display: boolean;
  panResponder: any;
};

export default class SwipeRating extends Component<
  SwipeRatingProps,
  SwipeRatingState
> {
  static defaultProps = {
    type: "star",
    ratingImage: STAR_IMAGE,
    ratingColor: "#f1c40f",
    ratingBackgroundColor: "white",
    ratingCount: 5,
    showReadOnlyText: true,
    imageSize: 40,
    minValue: 0,
    jumpValue: 0
  };
  ratingRef: any;

  constructor( props ) {
    super( props );
    const {
      onStartRating,
      onSwipeRating,
      onFinishRating,
      fractions
    } = this.props;
    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create( {
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: ( event, gesture ) => {
        const newPosition = new Animated.ValueXY();
        const tapPositionX = gesture.x0 - this.state.centerX + gesture.dx;

        newPosition.setValue( { x: tapPositionX, y: 0 } );
        if ( this.state.isComponentMounted ) {
          this.setState( { position: newPosition, value: tapPositionX } );
          const rating = this.getCurrentRating( tapPositionX );

          if ( typeof onStartRating === "function" ) {
            onStartRating( rating );
          }
        }
      },
      onPanResponderMove: ( event, gesture ) => {
        const newPosition = new Animated.ValueXY();
        const tapPositionX = gesture.x0 - this.state.centerX + gesture.dx;

        newPosition.setValue( { x: tapPositionX, y: 0 } );
        if ( this.state.isComponentMounted ) {
          this.setState( { position: newPosition, value: tapPositionX } );
          const rating = this.getCurrentRating( tapPositionX );

          if ( typeof onSwipeRating === "function" ) {
            onSwipeRating( rating );
          }
        }
      },
      onPanResponderRelease: () => {
        const rating = this.getCurrentRating( this.state.value );

        if ( rating >= this.props.minValue ) {
          if ( !fractions ) {
            // 'round up' to the nearest rating image
            this.setCurrentRating( rating );
          }
          if ( typeof onFinishRating === "function" ) {
            onFinishRating( rating );
          }
        }
      }
    } );

    this.state = {
      panResponder,
      position,
      display: false,
      isComponentMounted: false
    };
  }

  componentDidMount() {
    try {
      this.setState( { display: true, isComponentMounted: true }, () =>
        this.setCurrentRating( this.props.startingValue )
      );
    } catch ( err ) {
      // eslint-disable-next-line no-console
      console.log( err );
    }
  }

  componentDidUpdate( prevProps ) {
    if ( this.props.startingValue !== prevProps.startingValue ) {
      this.setCurrentRating( this.props.startingValue );
    }
  }

  handleLayoutChange() {
    // eslint-disable-next-line max-params
    this.ratingRef.measure( ( fx, fy, width, height, px ) => {
      const halfWidth = width / 2;
      const pageXWithinWindow = px % Dimensions.get( "window" ).width;

      this.setState( {
        centerX: pageXWithinWindow + halfWidth
      } );
    } );
  }

  getPrimaryViewStyle() {
    const { position } = this.state;
    const { imageSize, ratingCount, type } = this.props;

    const { color } = TYPES[type];

    const width = position.x.interpolate(
      {
        inputRange: [
          -ratingCount * ( imageSize / 2 ),
          0,
          ratingCount * ( imageSize / 2 )
        ],
        outputRange: [
          0,
          ratingCount * imageSize / 2,
          ratingCount * imageSize
        ],
        extrapolate: "clamp"
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

    const { backgroundColor } = TYPES[type];

    const width = position.x.interpolate(
      {
        inputRange: [
          -ratingCount * ( imageSize / 2 ),
          0,
          ratingCount * ( imageSize / 2 )
        ],
        outputRange: [
          ratingCount * imageSize,
          ratingCount * imageSize / 2,
          0
        ],
        extrapolate: "clamp"
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
    const { source } = TYPES[type];

    return times( ratingCount, index =>
      <View key={index} style={styles.starContainer}>
        <Image
          source={source}
          style={{ width: imageSize, height: imageSize, tintColor }}
        />
      </View>
    );
  }

  // eslint-disable-next-line max-statements
  getCurrentRating( value ) {
    const { fractions, imageSize, ratingCount } = this.props;

    const startingValue = ratingCount / 2;

    let currentRating = this.props.minValue ? this.props.minValue : 0;

    if ( value > ratingCount * imageSize / 2 ) {
      currentRating = ratingCount;
    } else if ( value < -ratingCount * imageSize / 2 ) {
      currentRating = this.props.minValue ? this.props.minValue : 0;
    } else if ( value <= imageSize || value > imageSize ) {
      const diff = value / imageSize;

      currentRating = startingValue + diff;
      currentRating = fractions ?
        Number( currentRating.toFixed( fractions ) ) :
        Math.ceil( currentRating );
    } else {
      currentRating = fractions ?
        Number( startingValue.toFixed( fractions ) ) :
        Math.ceil( startingValue );
    }
    if (
      this.props.jumpValue > 0 &&
      this.props.jumpValue < this.props.ratingCount
    ) {
      return (
        Math.ceil( currentRating * ( 1 / this.props.jumpValue ) ) /
        ( 1 / this.props.jumpValue )
      );
    } else {
      return currentRating;
    }
  }

  // eslint-disable-next-line max-statements
  setCurrentRating( rating ) {
    const { imageSize, ratingCount } = this.props;

    // `initialRating` corresponds to `startingValue` in the getter. Naming it
    // Differently here avoids confusion with `value` below.
    const initialRating = ratingCount / 2;

    let value = null;

    if ( rating > ratingCount ) {
      value = ratingCount * imageSize / 2;
    } else if ( rating < 0 ) {
      value = -ratingCount * imageSize / 2;
    } else if ( rating < ratingCount / 2 || rating > ratingCount / 2 ) {
      value = ( rating - initialRating ) * imageSize;
    } else {
      value = 0;
    }

    const newPosition = new Animated.ValueXY();

    newPosition.setValue( { x: value, y: 0 } );
    if ( this.state.isComponentMounted ) {
      this.setState( { position: newPosition, value } );
    }
  }

  displayCurrentRating() {
    const {
      ratingCount,
      type,
      readonly,
      showReadOnlyText,
      ratingTextColor
    } = this.props;
    const color = ratingTextColor || TYPES[type].color;

    return (
      <View style={styles.showRatingView}>
        <View style={styles.ratingView}>
          <Text style={[styles.ratingText, { color }]}>Rating: </Text>
          <Text style={[styles.currentRatingText, { color }]}>
            {this.getCurrentRating( this.state.value )}
          </Text>
          <Text style={[styles.maxRatingText, { color }]}>/{ratingCount}</Text>
        </View>
        <View>
          {readonly && showReadOnlyText &&
            <Text style={[styles.readonlyLabel, { color }]}>(readonly)</Text>
          }
        </View>
      </View>
    );
  }

  render() {
    const {
      readonly,
      type,
      ratingImage,
      ratingColor,
      ratingBackgroundColor,
      style,
      showRating
    } = this.props;

    if ( type === "custom" ) {
      const custom = {
        source: ratingImage,
        color: ratingColor,
        backgroundColor: ratingBackgroundColor
      };

      TYPES.custom = custom;
    }

    return this.state.display ?
      <View pointerEvents={readonly ? "none" : "auto"} style={style}>
        {showRating && this.displayCurrentRating()}
        <View
          style={styles.starsWrapper}
          {...this.state.panResponder.panHandlers}
        >
          <View
            style={styles.starsInsideWrapper}
            onLayout={() => {
              this.handleLayoutChange();
            }}
            ref={view => {
              this.ratingRef = view;
            }}
          >
            <Animated.View style={this.getPrimaryViewStyle()} />
            <Animated.View style={this.getSecondaryViewStyle()} />
          </View>
          {this.renderRatings()}
        </View>
      </View> :
     null;
  }

  componentWillUnmount() {
    this.setState( { isComponentMounted: false } );
  }
}

const styles = StyleSheet.create( {
  starsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  starsInsideWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  showRatingView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5
  },
  ratingView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5
  },
  ratingText: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : null,
    color: "#34495e"
  },
  readonlyLabel: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : null,
    color: "#34495a"
  },
  currentRatingText: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : null
  },
  maxRatingText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Trebuchet MS" : null,
    color: "#34495e"
  }
} );
