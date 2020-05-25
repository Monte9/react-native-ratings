import * as React from 'react';
import PropTypes from 'prop-types';
import { ImageStyle, ImageURISource } from 'react-native';

export interface RatingProps {

  /**
   * Graphic used for represent a rating
   *
   * Default is 'star'
   */
  type?: 'star' | 'rocket' | 'bell' | 'heart' | 'custom';

  /**
   * Pass in a custom image source; use this along with type='custom' prop above
   */
  ratingImage?: ImageURISource;

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
   * Color used for the background
   */
  tintColor?: string;

  /**
   * The size of each rating image
   *
   * Default is 50
   */
  imageSize?: number;

  /**
   * Displays the Built-in Rating UI to show the rating value in real-time
   *
   * Default is false
   */
  showRating?: boolean;

  /**
   * Exposes style prop to add additonal styling to the container view
   */
  style?: typeof PropTypes.object;

  /**
   * Whether the rating can be modiefied by the user
   *
   * Default is false
   */
  readonly?: boolean;

  /**
   * The initial rating to render
   *
   * Default is ratingCount/2
   */
  startingValue?: number;

  /**
   * The number of decimal places for the rating value; must be between 0 and 20
   */
  fractions?: number;

  /**
   * The minimum value the user can select
   *
   * Default is 0
   */
  minValue?: number;

  /**
   * Callback method when the user starts rating.
   */
  onStartRating?(): void;

  /**
   * Callback method when the user finishes rating. Gives you the final rating value as a whole number
   */
  onFinishRating?( rating: number ): void;
}

export class Rating extends React.Component<RatingProps> {}

export interface AirbnbRatingProps {

  /**
   * Initial value for the rating
   *
   * Default is 3
   */
  defaultRating?: number;

  /**
   * Labels to show when each value is tapped
   *
   * e.g. If the first star is tapped, then value in index 0 will be used as the label
   *
   * Default is ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
   */
  reviews?: string[];

  /**
   * Total number of ratings to display
   *
   * Default is 5
   */
  count?: number;

  /**
   * Size of rating image
   *
   * Default is 40
   */
  size?: number;

  /**
   * Whether the rating can be modiefied by the user
   *
   * Default is false
   */
  isDisabled?: boolean;


  /**
   * Determines if to show the reviews above the rating
   *
   * Default is true
   */
  showRating?: boolean;

  /**
   * Style for star image component
   *
   * Default is true
   */
  starStyle?: ImageStyle;

  /**
   * Callback method when the user finishes rating. Gives you the final rating value as a whole number
   */
  onFinishRating?( value: number ): void;
  
  /**
   * Color value for filled stars.
   *
   * Default is #004666
   */
  selectedColor?: string;
}

export class AirbnbRating extends React.Component<AirbnbRatingProps> {}
