import { StyleSheet, Dimensions } from 'react-native';
import {
  GUTTER,
  TITLE_TEXT_FONT_SIZE,
  BODY_TEXT_FONT_SIZE,
  Fonts,
} from 'lib/styleConstants';
import { rgba, black, white } from 'lib/palette';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  list: {
    paddingHorizontal: GUTTER,
    flex: 1,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switch: {
    marginHorizontal: 5,
  },
  offlineContainer: {
    backgroundColor: rgba(black, 0.7),
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
  offlineText: {
    color: white,
    fontSize: BODY_TEXT_FONT_SIZE,
    fontFamily: Fonts.JOSEFIN_LIGHT,
  },
  emptyListContainer: {
    flex: 1,
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBooks: {
    fontSize: TITLE_TEXT_FONT_SIZE,
    fontFamily: Fonts.CINZEL,
  },
  sortText: {
    fontSize: BODY_TEXT_FONT_SIZE,
    fontFamily: Fonts.JOSEFIN_LIGHT,
  },
});
