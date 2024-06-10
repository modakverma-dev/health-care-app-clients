import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import Check from '../Icons/Check';
export default function Selecteddiv() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Check />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleX: 0.06 }, { scaleY: 0.06 }],
  },
});
