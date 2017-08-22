import _ from 'lodash';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Star from './Star'

export default class AirbnbRating extends React.Component {
  constructor() {
    super()

    this.state = {
      position: 5
    }
  }

  componentDidMount() {
    const { defaultRating } = this.props

    this.setState({ position: defaultRating || 5 })
  }

  renderStars(rating_array) {
    return _.map(rating_array, (star, index) => {
      return star
    })
  }

  starSelectedInPosition(position) {
    this.setState({ position: position })
  }

  displayReview() {
    const { position } = this.state

    switch (position) {
      case 1:
        return "Terrible"
      case 2:
        return "Bad"
      case 3:
        return "Okay"
      case 4:
        return "Good"
      case 5:
        return "Great"
      default:
        return "Great"
    }
  }

  render() {
    const { position } = this.state
    const { count, reviews, showReviews } = this.props
    const rating_array = []

    _.times(count || 5, index => {
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
        { showReviews &&
          <Text style={styles.reviewText}>
            {reviews ? reviews[position - 1] : this.displayReview()}
          </Text>
        }
        <View style={styles.starContainer}>
          {this.renderStars(rating_array)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    color: 'rgba(230, 196, 46, 1)'
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
