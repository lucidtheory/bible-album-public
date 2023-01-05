import React, { ReactElement } from 'react';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native';
import { useDispatch } from 'store/hooks';
import AnalyticsTouchable from 'components/AnalyticsTouchable';
import { IBook } from 'api/types';
import { LibraryEpicActions } from 'store/sagas/epics/library';
import styles from './LibraryListItem.styles';

interface ILibraryListItem {
  book: IBook
}

const LibraryListItem = ({ book }: ILibraryListItem): ReactElement => {
  const dispatch = useDispatch();

  const handleViewBook = (): void => {
    dispatch({
      type: LibraryEpicActions.GO_TO_BOOK,
      payload: book,
    });
  };

  return (
    <AnalyticsTouchable
      onPress={handleViewBook}
      eventType="tap-to-view-book"
      style={styles.touchable}
    >
      <FastImage
        source={{ uri: book.coverImageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{book.title}</Text>
    </AnalyticsTouchable>
  );
};

export default LibraryListItem;
