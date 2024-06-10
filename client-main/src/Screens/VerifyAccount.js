import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Back from '../Icons/Back';
import { color } from '../Theme/color';
import CustomInput from '../Components/CustomInput';
import { VerifyEmailApi } from '../Api/userApi';
import axios from 'axios';
import { ffamily } from '../Theme/font';
import { useNavigation, useRoute } from '@react-navigation/native';
import { emailRegex } from '../constant';
import { showErrormessage, showSuccessToast } from '../Utils/toastMessages';
import CustomButton from '../Components/CustomButton';

const VerifyAccount = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const { email } = route.params;
  const handleVerification = async () => {
    if (!email || !emailRegex.test(email)) {
      showErrormessage('Please enter a valid email');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(VerifyEmailApi, {
        email,
      });
      if (response.status === 200) {
        setIsLoading(false);
        showSuccessToast(response?.data?.message);
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        showErrormessage(error?.response?.data?.message);
      }
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: color.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={{ position: 'absolute', left: 0, top: 0 }}
            onPress={() => navigation.goBack()}>
            <Back />
          </Pressable>
          <Text style={styles.headerText}>Verify Account</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Verify Account</Text>
          <Text style={styles.thirdtext}>
            Please enter your email to verify account
          </Text>
        </View>
        <View style={styles.thirdcontainer}>
          <CustomInput placeholder="Enter your Email" value={email} />
          <CustomButton
            isLoading={isLoading}
            disabled={isLoading}
            buttontext="Verify"
            handlePress={handleVerification}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    flexDirection: 'column',
    gap: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: ffamily.HellixBold,
    paddingTop: 8,
    color: color.black,
  },
  content: {
    display: 'flex',
    paddingTop: 10,
    paddingStart: 10,
  },
  title: {
    fontSize: 27,
    fontFamily: ffamily.HellixBlack,
    color: color.black,
  },
  thirdtext: {
    fontFamily: ffamily.HellixRegular,
    opacity: 0.6,
    fontSize: 16,
    flexWrap: 'wrap',
    lineHeight: 26,
    paddingRight: 80,
    paddingTop: 10,
    color: color.black,
  },
  thirdcontainer: {
    display: 'flex',
    padding: 10,
    gap: 20,
  },
});

export default VerifyAccount;
