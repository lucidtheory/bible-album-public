import { StyleSheet } from 'react-native';
import { black } from 'lib/palette';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    backgroundColor: black,
  },
  progress: {
    position: 'absolute',
    left: '30%',
    right: '30%',
  },
});
