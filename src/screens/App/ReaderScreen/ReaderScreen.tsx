import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import ScreenWrapper from 'components/ScreenWrapper';
import { ProgressView } from '@react-native-community/progress-view';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { setBackgroundColorAsync, setButtonStyleAsync } from 'expo-navigation-bar';
import { useSelector, useDispatch } from 'store/hooks';
import { bookViewingSelector, currentPageSelector } from 'store/reducers/reader';
import { ReaderEpicActions } from 'store/sagas/epics/reader';
import Pdf from 'react-native-pdf';
import { gray700, black, blue200 } from 'lib/palette';
import ReaderBar from './ReaderBar';
import styles from './ReaderScreen.styles';

const ReaderScreen = (): ReactElement => {
  const pdfRef = useRef<Pdf>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bookViewing = useSelector(bookViewingSelector);
  const currentPage = useSelector(currentPageSelector);
  const [initialPage] = useState<number>(currentPage[bookViewing.title]);
  const isFocused = useIsFocused();

  // add title to navigation header on mount
  useEffect(() => {
    navigation.setOptions({
      title: bookViewing!.title,
    });
  }, [bookViewing, navigation]);

  const handlePageChange = (pageNumber: number): void => {
    dispatch({
      type: ReaderEpicActions.CHANGE_PAGE,
      payload: pageNumber,
    });
  };

  // set nav bar color to white when focusing on screen
  useEffect(() => {
    if (isFocused && Platform.OS === 'android') {
      setBackgroundColorAsync(black);
      setButtonStyleAsync('light');
    }
  }, [isFocused]);

  return (
    <ScreenWrapper style={styles.container}>
      <StatusBar backgroundColor={black} />
      <Pdf
        ref={pdfRef}
        source={{ uri: bookViewing.bookUrl, cache: true }}
        onPageChanged={(page: any) => handlePageChange(page)}
        page={initialPage}
        style={styles.pdf}
        horizontal
        trustAllCerts={Platform.OS === 'ios'}
        enablePaging
        renderActivityIndicator={(progress) => (
          <ProgressView
            progressTintColor={blue200}
            trackTintColor={gray700}
            progress={progress}
            style={styles.progress}
          />
        )}
      />
      <ReaderBar setPage={(page: number) => pdfRef.current?.setPage(page)} />
    </ScreenWrapper>
  );
};

export default ReaderScreen;
