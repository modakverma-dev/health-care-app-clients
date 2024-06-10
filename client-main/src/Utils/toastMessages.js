import Toast from 'react-native-simple-toast';

export const showSuccessToast = message => {
  return Toast.showWithGravity(message, Toast.LONG, Toast.TOP);
};

export const showErrormessage = err => {
  return Toast.show(err, Toast.LONG, {
    backgroundColor: 'red',
  });
};
