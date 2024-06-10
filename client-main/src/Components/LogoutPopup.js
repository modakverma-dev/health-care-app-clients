import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';

// import { setLogout } from '../../Redux/slices/popupSlice';
// import { clearUser, setFeedbackRating } from '../../Redux/slices/authSlice';
import {ffamily} from '../Theme/font';
import commonStyles from '../Theme/common';
import {color} from '../Theme/color';
import {setLogout} from '../Redux/slices/popupSlice';
import {clearUser} from '../Redux/slices/authSlice';
import {showSuccessToast} from '../Utils/toastMessages';
import {Logout} from '../Api/authApi';

const {width} = Dimensions.get('window');

const LogOutPopup = () => {
  const logoutPopup = useSelector(state => state.popup.logoutPopup);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setLogout({logoutPopup: false}));
  };
  const onLogout = async () => {
    try {
      // const res = await axios.post(Logout, {
      //   email:
      // });
    } catch (err) {
      console.log(err);
    }
    dispatch(clearUser());
    dispatch(setLogout({logoutPopup: false}));
    showSuccessToast('Logged out successfully');
  };
  return (
    <Modal
      animationIn="slideInUp"
      animationInTiming={800}
      hasBackdrop={true}
      backdropColor={color.black}
      backdropOpacity={0.15}
      isVisible={logoutPopup}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={styles.modalWrap}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Logout Confirmation</Text>
          <Text style={styles.message}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.logoutButton}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default LogOutPopup;

const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'relative',
    overflow: 'hidden',
    width: width * 0.86,
    backgroundColor: color.background,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
    ...commonStyles.modalElevation,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    paddingVertical: 15,
    color: color.black,
    fontFamily: ffamily.HellixBold,
    borderBottomWidth: 0.5,
    borderColor: color.fade,
    width: '100%',
    textAlign: 'center',
  },
  message: {
    paddingVertical: 22,
    fontSize: 16,
    fontFamily: ffamily.HellixRegular,
    opacity: 0.7,
    textAlign: 'center',
    color: color.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 24,
  },
  centeredView: {
    position: 'absolute',
    width: width,
    height: '100%',
    backgroundColor: color.slate,
  },
  logoutButton: {
    fontSize: 16,
    backgroundColor: color.primary,
    borderWidth: 1,
    borderColor: color.primary,
    padding: 10,
    borderRadius: 5,
    fontFamily: ffamily.HellixRegular,
    color: color.white,
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  cancelButton: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: color.primary,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 5,
    color: color.primary,
    fontFamily: ffamily.HellixRegular,
  },
});
