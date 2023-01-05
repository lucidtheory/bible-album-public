import React, {
  ReactElement,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { Switch, Text, View, Platform, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import AnalyticsFlatList from 'components/AnalyticsFlatList';
import { useSelector, useDispatch } from 'store/hooks';
import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';
import { booksSelector } from 'store/reducers/library';
import {
  booksCompletedSelector,
  hasAskedForReviewSelector,
  appLoadingSelector,
} from 'store/reducers/app';
import { alphabeticalSort, biblicalSort } from 'lib/sort';
import ScreenWrapper from 'components/ScreenWrapper';
import { AppEpicActions } from 'store/sagas/epics/app';
import { IBook } from 'api/types';
import { white } from 'lib/palette';
import handleAskForReview from 'lib/handleAskForReview';
import Loading from './Loading';
import LibraryListItem from './LibraryListItem';
import styles from './LibraryScreen.styles';

const LibraryScreen = (): ReactElement => {
  const { isConnected } = useNetInfo();
  const books = useSelector(booksSelector);
  const navigation = useNavigation();
  const [isAlphabeticalSort, setIsAlphabeticalSort] = useState<boolean>(false);
  const [bookState, setBookState] = useState<IBook[]>(books);
  const booksCompleted = useSelector(booksCompletedSelector);
  const hasAskedForReview = useSelector(hasAskedForReviewSelector);
  const appLoading = useSelector(appLoadingSelector);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (e: any) => {
          const { nativeEvent: { text } } = e;

          const filteredBooks = books.filter(
            (b) => b.title.toLowerCase().includes(text.toLowerCase()),
          );

          if (isAlphabeticalSort) {
            setBookState(alphabeticalSort(filteredBooks));
          } else {
            setBookState(biblicalSort(filteredBooks));
          }
        },
      },
    });
  }, [
    navigation,
    isAlphabeticalSort,
    books,
  ]);

  // sort books upon sort selection
  useEffect(() => {
    if (isAlphabeticalSort) {
      setBookState(alphabeticalSort(books));
    } else {
      setBookState(biblicalSort(books));
    }
  }, [books, isAlphabeticalSort]);

  // set nav bar color to white when focusing on screen
  useEffect(() => {
    if (isFocused && Platform.OS === 'android') {
      setBackgroundColorAsync(white);
      setButtonStyleAsync('dark');
    }
  }, [isFocused]);

  // Ask for a review once the user has gotten to 5 books read
  useEffect(() => {
    if (isFocused && (booksCompleted > 5) && !hasAskedForReview) {
      handleAskForReview();
      dispatch({ type: AppEpicActions.SET_HAS_ASKED_FOR_REVIEW });
    }
  }, [
    booksCompleted,
    hasAskedForReview,
    dispatch,
    isFocused,
  ]);

  const renderBook = ({ item }: { item: IBook }): ReactElement => (
    <LibraryListItem book={item} />
  );

  const renderListHeader = (): ReactElement => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortText}>Sort by:  Biblical</Text>
      <Switch
        onValueChange={setIsAlphabeticalSort}
        value={isAlphabeticalSort}
        style={styles.switch}
      />
      <Text style={styles.sortText}>Alphabetical</Text>
    </View>
  );

  const renderEmptyList = (): ReactElement => (
    appLoading
      ? <Loading />
      : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.noBooks}>No Books Available</Text>
        </View>
      )
  );

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar backgroundColor={white} />
      <AnalyticsFlatList
        data={bookState}
        renderItem={renderBook}
        keyExtractor={(item: IBook) => item.id}
        listName="library-books"
        numColumns={3}
        ListHeaderComponent={renderListHeader}
        contentInsetAdjustmentBehavior="automatic"
        estimatedItemSize={200}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />
      <View style={[styles.offlineContainer, isConnected && styles.hidden]}>
        <Text style={styles.offlineText}>You are Offline</Text>
      </View>
    </ScreenWrapper>
  );
};

export default LibraryScreen;
