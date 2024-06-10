import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { color } from '../Theme/color';
import { ffamily } from '../Theme/font';
const PerspectiveButton = ({
  buttontext,
  handlePress,
  disabled,
  isLoading,
  active,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          active
            ? { backgroundColor: color.black }
            : { backgroundColor: color.slate },
        ]}
        onPress={disabled ? () => {} : handlePress}>
        {isLoading ? (
          <ActivityIndicator
            style={{
              alignSelf: 'center',
              width: '100%',
            }}
            size="small"
            color="#fff"
          />
        ) : (
          <Text
            style={[
              styles.buttonText,
              active ? { color: 'white' } : { color: color.black },
            ]}>
            {buttontext}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 'auto',
    display: 'flex',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    paddingBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: ffamily.HellixRegular,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default PerspectiveButton;
