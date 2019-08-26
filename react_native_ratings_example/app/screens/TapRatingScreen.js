import React, { Component } from 'react';
import { 
  Text, View, ScrollView, SafeAreaView, Platform, StyleSheet
} from 'react-native';
import { Card } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';

class TapRatingScreen extends Component {
  ratingCompleted( rating ) {
    console.log( `Rating is: ${rating}` );
  }

  render() {
    return (
      <SafeAreaView style={styles.flex}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>Tap Rating</Text>
          <Text style={styles.subtitleText}>Airbnb-style ratings with tap gesture.</Text>
        </View>
        <ScrollView style={styles.flex} contentContainerStyle={styles.center}>
          <Card title="DEFAULT" containerStyle={styles.card}>
            <AirbnbRating showRating={false} />
          </Card>
          <Card title="WITH RATING" containerStyle={styles.card}>
            <AirbnbRating showRating={true} />
          </Card>
          <Card title="CUSTOM RATING" containerStyle={styles.card}>
            <AirbnbRating
              count={10}
              reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
              defaultRating={5}
              size={20}
              onFinishRating={this.ratingCompleted}
            />
          </Card>
          <Card title="CUSTOM COLOR" containerStyle={styles.card}>
            <AirbnbRating showRating={false} selectedColor="green" />
          </Card>
          <Card title="DISABLED" containerStyle={styles.card}>
            <AirbnbRating isDisabled={true} showRating={false} defaultRating={4} />
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
  },
});

export default TapRatingScreen;