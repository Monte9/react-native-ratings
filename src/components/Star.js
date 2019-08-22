import React, {PureComponent} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';

const STAR_IMAGE = require( '../images/airbnb-star.png' );
const STAR_FULL_IMAGE = require( '../images/airbnb-star-full.png' );
const STAR_HALF_IMAGE = require( '../images/airbnb-star-half.png' );
const STAR_SIZE = 40;

export default class Star extends PureComponent {
  static defaultProps = {
    selectedColor: '#f1c40f'
  };

  constructor() {
    super();
    this.springValue = new Animated.Value( 1 );

    this.state = {
      selected: false
    };
  }

  spring() {
    const { position, starSelectedInPosition } = this.props;

    this.springValue.setValue( 1.2 );

    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 2,
        tension: 1
      }
    ).start();

    this.setState( { selected: !this.state.selected } );
    starSelectedInPosition( position );
  }

  render() {
    const { fill, size, selectedColor, isDisabled, half } = this.props;
    let starSource;
    if (fill) {
      starSource = STAR_FULL_IMAGE;
    } else if (half) {
      starSource = STAR_HALF_IMAGE;
    } else {
      starSource = STAR_IMAGE;
    }

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.spring.bind( this )} disabled={isDisabled}>
        <Animated.Image
          source={starSource}
          style={{
            margin: (size || STAR_SIZE) / 12,
            width: size || STAR_SIZE,
            height: size || STAR_SIZE,
            transform: [{ scale: this.springValue }]
          }}
        />
      </TouchableOpacity>
    );
  }
}
