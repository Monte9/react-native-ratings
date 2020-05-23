import React, {PureComponent} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';

const STAR_IMAGE = require( '../images/airbnb-star.png' );
const STAR_SELECTED_IMAGE = require( '../images/airbnb-star-selected.png' );
const STAR_SIZE = 40;

export default class Star extends PureComponent {
  static defaultProps = {
    selectedColor: '#f1c40f',
    unselectedColor: '#000000',
    size: STAR_SIZE,
    image: STAR_IMAGE,
    selectedImage: STAR_SELECTED_IMAGE
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
    const { fill, size, selectedColor, unselectedColor, isDisabled, starStyle, image, selectedImage } = this.props;
    const starSource = fill ? selectedImage : image;
    let tint = undefined;
    if (fill && selectedColor)
      tint = selectedColor;
    else if (!fill && unselectedColor)
      tint = unselectedColor;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.spring.bind( this )} disabled={isDisabled}>
        <Animated.Image
          source={starSource}
          style={[
            styles.starStyle,
            {
              tintColor: tint,
              width: size,
              height: size,
              transform: [{ scale: this.springValue }]
            },
            starStyle
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create( {
  starStyle: {
    margin: 3
  }
} );
