import { StyleSheet } from 'react-native';
import { black, white } from 'lib/palette';
import { Fonts } from 'lib/styleConstants';

export default StyleSheet.create({
  readerHeader: {
    backgroundColor: black,
  },
  readerHeaderTitle: {
    fontFamily: Fonts.CINZEL,
    color: white,
  },
});
