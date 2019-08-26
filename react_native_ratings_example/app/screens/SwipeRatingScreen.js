import React, { Component } from 'react';
import { 
  Text, View, ScrollView, SafeAreaView, Platform, StyleSheet
} from 'react-native';
import { Card } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

const WATER_IMAGE = require( '../../assets/water.png' );

class SwipeRatingScreen extends React.Component {
  ratingCompleted( rating ) {
    console.log( `Rating is: ${rating}` );
  }

  render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>Swipe Rating</Text>
          <Text style={styles.subtitleText}>Fancy swipe ratings with fractions.</Text>
        </View>
        <ScrollView style={styles.flex} contentContainerStyle={styles.center}>
          <Card title="DEFAULT" containerStyle={styles.card}>
            <Rating showRating={false} fractions={false} />
          </Card>
          <Card title="WITH RATING" containerStyle={styles.card}>
            <Rating showRating={true} fractions={false} />
          </Card>
          <Card title="WITH FRACTIONS" containerStyle={styles.card}>
            <Rating 
              showRating={true} fractions={2} ratingTextColor="teal" 
              onStartRating={() => console.log("started rating")}
            />
          </Card>
          <Card title="CUSTOM RATING" containerStyle={styles.card}>
            <Rating
              type="heart"
              ratingCount={3}
              fractions={2}
              startingValue={1.57}
              imageSize={40}
              onFinishRating={this.ratingCompleted}
              showRating
              style={{ paddingVertical: 10 }}
            />
          </Card>
          <Card title="CUSTOM TINT COLOR" containerStyle={styles.card}>
            <Rating showRating={true} fractions={false} tintColor="white" startingValue={3} />
          </Card>
          <Card title="CUSTOM IMAGE" containerStyle={styles.card}>
            <Rating
              type="custom"
              ratingImage={WATER_IMAGE}
              ratingColor="#3498db"
              ratingBackgroundColor="#ceee"
              ratingCount={10}
              imageSize={30}
              onFinishRating={this.ratingCompleted}
              showRating={false}
              style={{ paddingVertical: 10 }}
            />
          </Card>
          <Card title="DISABLED" containerStyle={styles.card}>
            <Rating
              type="star"
              fractions={1}
              startingValue={3.6}
              readonly
              showRating
              imageSize={40}
              ratingTextColor="black"
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create( {
  flex: {
    flex: 1
  },
  center:  {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingContainer: {
    paddingBottom: 30
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : null,
    color: '#27ae60'
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e'
  },
  card: {
    width: '85%', 
    marginBottom: 20
  }
});

export default SwipeRatingScreen;