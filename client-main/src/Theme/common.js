import { Dimensions, StyleSheet } from 'react-native';
import { color } from './color';

const { width } = Dimensions.get('window');

const commonStyles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  paddingHorizontal: {
    paddingHorizontal: width * 0.04,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  safeareaView: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default commonStyles;
