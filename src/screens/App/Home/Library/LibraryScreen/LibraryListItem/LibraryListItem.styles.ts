import { StyleSheet } from 'react-native';
import { Fonts, BODY_TEXT_FONT_SIZE } from 'lib/styleConstants';
import { black, rgba } from 'lib/palette';

export default StyleSheet.create({
  touchable: {
    flex: 1,
    margin: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 8,
    aspectRatio: 1545 / 2000,
    backgroundColor: rgba(black, 0.05),
  },
  title: {
    fontFamily: Fonts.JOSEFIN_LIGHT,
    marginTop: 5,
    fontSize: BODY_TEXT_FONT_SIZE,
  },
});
