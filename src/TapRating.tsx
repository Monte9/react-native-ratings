import _ from "lodash";

import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";

import Star from "./components/Star";

type TapRatingProps = {
  count: number;
  reviews: string[];
  showRating: boolean;
  reviewColor: string;
  reviewSize: number;
  defaultRating: number;
  starContainerStyle: StyleProp<ViewStyle>;
  onFinishRating: ( number ) => number;
};

const TapRating: React.FunctionComponent<TapRatingProps> = props => {
  const [position, setPosition] = useState<number>( 5 );

  useEffect( () => {
    const { defaultRating } = props;

    setPosition( defaultRating );
  }, [props] );

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

export default TapRating;

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
