import { StyleSheet, Dimensions } from 'react-native';
import { TITLE_TEXT_FONT_SIZE, Fonts } from 'lib/styleConstants';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.5,
  },
  text: {
    fontSize: TITLE_TEXT_FONT_SIZE,
    fontFamily: Fonts.JOSEFIN_LIGHT,
  },
  lottie: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
});
