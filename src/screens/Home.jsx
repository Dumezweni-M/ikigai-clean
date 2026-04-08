// import "./global.css";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';
import layout from '../styles/layout';

function Home() {
  return (
    <View style={styles.container}>
        <View style={layout.cardSm}>
            <Text style={typography.label}>State of Mind</Text>
            <Text style={typography.h1}>3 of 4 pillars active</Text>
            <Text style={typography.body}>Flow state achieved in 16 consecutive sessions. Balance is reaching optimal equilibrium</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  text: {
    fontSize: 24,
  },
});

export default Home;