import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Card } from 'react-native-elements';

import { AirbnbRating, Rating } from '../../src/index';

class DemoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>React Native Ratings</Text>
          <Text style={styles.subtitleText}>gestures for the win!</Text>
        </View>
        <Card title="TAP RATING" containerStyle={styles.card}>
          <AirbnbRating showRating={false} />
        </Card>
        <Card title="SWIPE RATING" containerStyle={styles.card}>
          <View style={styles.flexCenter}>
            <Rating showRating={false} fractions={false} />
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1, 
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
  flexCenter: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default DemoScreen;