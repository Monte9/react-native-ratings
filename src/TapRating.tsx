import _ from "lodash";

import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";

import Star from "./components/Star";

export type TapRatingProps = {

  /**
   * Total number of ratings to display
   *
   * Default is 5
   */
  count?: number;

  /**
   * Labels to show when each value is tapped
   *
   * e.g. If the first star is tapped, then value in index 0 will be used as the label
   *
   * Default is ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
   */
  reviews?: string[];

  /**
   * Determines if to show the reviews above the rating
   *
   * Default is true
   */
  showRating?: boolean;

  /**
   * Color value for review.
   *
   * Default is #f1c40f
   */
  reviewColor?: string;

  /**
   * Size value for review.
   *
   * Default is 40
   */
  reviewSize?: number;

  /**
   * Initial value for the rating
   *
   * Default is 3
   */
  defaultRating?: number;

  /**
   * Style for star container
   *
   * Default is none
   */
  starContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Callback method when the user finishes rating. Gives you the final rating value as a whole number
   */
  onFinishRating?: ( number ) => void;

  /**
   * Whether the rating can be modiefied by the user
   *
   * Default is false
   */
  isDisabled?: boolean;

  /**
   * Color value for filled stars.
   *
   * Default is #004666
   */
  selectedColor?: string;

  /**
   * Size of rating image
   *
   * Default is 40
   */
  size?: number;

  /**
   * Pass in a custom base image source
   */
  starImage?: string;
};

const TapRating: React.FunctionComponent<TapRatingProps> = props => {
  const [position, setPosition] = useState<number>( props.defaultRating );

  useEffect( () => {
    const { defaultRating } = props;

    if ( defaultRating === null || defaultRating === undefined ) {
      setPosition( 3 );
    } else {
      setPosition( defaultRating );
    }
  }, [props.defaultRating] );

  const renderStars = rating_array => {
    return _.map( rating_array, star => {
      return star;
    } );
  };

  const starSelectedInPosition = position => {
    const { onFinishRating } = props;

    if ( typeof onFinishRating === "function" ) {
      onFinishRating( position );
    }

    setPosition( position );
  };

  const { count, reviews, showRating, reviewColor, reviewSize } = props;
  const rating_array = [];
  const starContainerStyle = [styles.starContainer];

  if ( props.starContainerStyle ) {
    starContainerStyle.push( props.starContainerStyle );
  }

  _.times( count, index => {
    rating_array.push(
      <Star
        key={index}
        position={index + 1}
        starSelectedInPosition={value => {
          starSelectedInPosition( value );
        }}
        fill={position >= index + 1}
        {...props}
      />
    );
  } );

  return (
    <View style={styles.ratingContainer}>
      {showRating &&
        <Text
          style={[
            styles.reviewText,
            { fontSize: reviewSize, color: reviewColor }
          ]}
        >
          {reviews[position - 1]}
        </Text>
      }
      <View style={starContainerStyle}>{renderStars( rating_array )}</View>
    </View>
  );
};

TapRating.defaultProps = {
  defaultRating: 3,
  reviews: ["Terrible", "Bad", "Okay", "Good", "Great"],
  count: 5,
  showRating: true,
  reviewColor: "rgba(230, 196, 46, 1)",
  reviewSize: 25
};

const styles = StyleSheet.create( {
  ratingContainer: {
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  reviewText: {
    fontWeight: "bold",
    margin: 10
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
} );

export default TapRating;
