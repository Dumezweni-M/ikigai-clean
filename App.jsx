// import "./global.css";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text className="text-2xl">Hello. I'm here.</Text>
      <Text className="text-4xl">Hello. I'm here.</Text>
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

export default App;