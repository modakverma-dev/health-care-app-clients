import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { color } from '../Theme/color';
import { ffamily } from '../Theme/font';
import Eye from '../Icons/Eye';

export default function CustomInput({
  placeholder,
  value,
  onFocus,
  onBlur,
  onChangeText,
  focus,
  type,
}) {
  const [show, setShow] = useState(false);
  return (
    <View
      style={[
        {
          position: 'relative',
          borderWidth: 1,
          borderColor: color.fieldBorder,
          borderRadius: 8,
          paddingHorizontal: 10,
        },
        focus && styles.inputFocused,
      ]}>
      <TextInput
        style={styles.input}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={color.fade}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' ? (show ? false : true) : false}
      />
      {type === 'password' && (
        <Pressable
          onPress={() => setShow(prev => !prev)}
          style={{ position: 'absolute', right: 10, top: 14 }}>
          <Eye show={show} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.fieldBorder,
    paddingHorizontal: 10,
    minHeight: 53,
    marginBottom: 10,
  },
  input: {
    height: '100%',
    width: '100%',
    flex: 1,
    color: color.black,
    fontSize: 16,
    fontFamily: ffamily.HellixMedium,
    lineHeight: 26,
    paddingVertical: 12,
  },
  inputFocused: {
    borderColor: color.primary,
    opacity: 1,
  },
  iconContainer: {
    padding: 10,
  },
});
