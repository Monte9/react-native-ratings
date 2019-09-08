import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View } from 'react-native';

import Star from './components/Star'

export default class TapRating extends Component {
  static defaultProps = {
    defaultRating: 3,
    reviews: ["Terrible", "Bad", "Okay", "Good", "Great"],
    count: 5,
    onFinishRating: () => console.log('Rating selected. Attach a function here.'),
    showRating: true,
    reviewColor: 'rgba(230, 196, 46, 1)',
    reviewSize: 25
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultRating } = nextProps;

    if (defaultRating !== prevState.defaultRating) {
      return {
        position: defaultRating,
        defaultRating
      }
    }
    return null;
  }

  constructor() {
    super()

    this.state = {
      position: 5
    }
  }

  componentDidMount() {
    const { defaultRating } = this.props

    this.setState({ position: defaultRating })
  }

  renderStars(rating_array) {
    return _.map(rating_array, (star, index) => {
      return star
    })
  }

  starSelectedInPosition(position) {
    const { onFinishRating } = this.props

    onFinishRating(position);

    this.setState({ position: position })
  }

  render() {
    const { position } = this.state
    const { count, reviews, showRating, reviewColor, reviewSize } = this.props
    const rating_array = []
    const starContainerStyle = [styles.starContainer]

    if (this.props.starContainerStyle) {
        starContainerStyle.push(this.props.starContainerStyle);
    }

    _.times(count, index => {
      rating_array.push(
        <Star
          key={index}
          position={index + 1}
          starSelectedInPosition={this.starSelectedInPosition.bind(this)}
          fill={position >= index + 1}
          {...this.props}
        />
      )
    })

    return (
      <View style={styles.ratingContainer}>
        { showRating &&
          <Text style={[styles.reviewText, {fontSize: reviewSize, color: reviewColor}]}>
            {reviews[position - 1]}
          </Text>
        }
        <View style={starContainerStyle}>
          {this.renderStars(rating_array)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontWeight: 'bold',
    margin: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
