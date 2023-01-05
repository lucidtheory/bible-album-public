import { StyleSheet } from 'react-native';
import { TITLE_TEXT_FONT_SIZE, GUTTER, Fonts } from 'lib/styleConstants';
import { gray500 } from 'lib/palette';

export default StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: GUTTER,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray500,
    width: '100%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: TITLE_TEXT_FONT_SIZE,
  },
  title: {
    fontSize: TITLE_TEXT_FONT_SIZE,
    fontFamily: Fonts.JOSEFIN_LIGHT,
  },
});
