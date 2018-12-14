<p align="center">
  <a href="https://github.com/Monte9/react-native-ratings">
    <img alt="react-native-ratings" src="./resources/logo.png" width="450">
  </a>
</p>

<p align="center">
  Ratings component for React Native with tap and swipe enabled.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-ratings"><img src="https://img.shields.io/npm/v/react-native-ratings.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/react-native-ratings"><img src="https://img.shields.io/npm/dm/react-native-ratings.svg?style=flat-square"></a>
</p>

## Demo - [try it now](https://expo.io/@monte9/react-native-ratings)

![Demo gif](./resources/airbnb_ratings.gif)

### Tap Rating

<div style="flex-direction: row">
  <img src="./resources/tap_rating_1.png" width="300">
  <img src="./resources/tap_rating_2.png" width="300">
</div>

### Swipe Rating

<div style="flex-direction: row">
  <img src="./resources/swipe_rating_1.png" width="300">
  <img src="./resources/swipe_rating_2.png" width="300">
</div>

## Installation

Install the package using yarn or npm:

```yarn add react-native-ratings```

  OR
  
```npm install --save react-native-ratings```

## Usage

``` js
import { Rating, AirbnbRating } from 'react-native-ratings';

const WATER_IMAGE = require('./water.png')

ratingCompleted(rating) {
  console.log("Rating is: " + rating)
}

<AirbnbRating />

<AirbnbRating
  count={11}
  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
  defaultRating={11}
  size={20}
/>

<Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>

<Rating
  type='heart'
  ratingCount={3}
  imageSize={60}
  showRating
  onFinishRating={this.ratingCompleted}
/>

<Rating
  type='custom'
  ratingImage={WATER_IMAGE}
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={10}
  imageSize={30}
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>
```

Also refer to the [`example`](https://github.com/Monte9/react-native-ratings/tree/master/example)  app for more detailed usage example.

You can also run the Expo app locally.

## API

| prop | default | type | description |
| ---- | ---- | ----| ---- |
| **onFinishRating** | none | function | Callback method when the user finishes rating. Gives you the final rating value as a whole number **(required)** |
| type | star | string | Choose one of the built-in types: `star`, `rocket`, `bell`, `heart` or use type `custom` to render a custom image (optional) |
| ratingImage | star | string | Pass in a custom image source; use this along with `type='custom'` prop above (optional) |
| ratingColor | #f1c40f | string (color) | Pass in a custom fill-color for the rating icon; use this along with `type='custom'` prop above (optional) |
| ratingBackgroundColor | white | string (color) | Pass in a custom background-fill-color for the rating icon; use this along with `type='custom'` prop above (optional) |
| ratingCount | 5 | number | The number of rating images to display (optional) |
| imageSize | 50 | number | The size of each rating image (optional) |
| showRating | none | boolean | Displays the Built-in Rating UI to show the rating value in real-time (optional) |
| style | none | function | Exposes style prop to add additonal styling to the container view (optional) |


## Try it out

You can try it out with Exponent [here](https://expo.io/@monte9/react-native-ratings).


## Motivation

One of my friends showed me [this](https://github.com/kartik-v/bootstrap-star-rating/) [Star Rating feature in Bootstrap](http://plugins.krajee.com/star-rating-demo-theme-default) and it looks really interesting. So I challenged myself to re-implement it in React Native.

Followed by that, for `v3`, I recreated the Airbnb ratings component and added it to this repo, in case others find this useful. It works out of the box and is quite functional.

Also this is my first [`npm module`](https://www.npmjs.com/package/react-native-ratings) :confetti_ball:

## Feedback

This repo is being actively manitained. Feel free to open a new Issue with a `Feature Request` or submit a PR with an `Enhancement`.
