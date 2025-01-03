import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PeacefulSoundsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Peaceful Sounds Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default PeacefulSoundsScreen;
