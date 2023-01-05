import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'store/hooks';
import { bookViewingSelector, currentPageSelector } from 'store/reducers/reader';
import Slider from '@react-native-community/slider';
import { gray500, gray700 } from 'lib/palette';
import styles from './ReaderBar.styles';

interface IReaderBar {
  setPage: any;
}

const ReaderBar = ({ setPage }: IReaderBar): ReactElement => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bookViewing = useSelector(bookViewingSelector);
  const currentPage = useSelector(currentPageSelector);
  const [showScrubberPage, setShowScubberPage] = useState<boolean>(false);
  const [scrubberPage, setScrubberPage] = useState<number>(currentPage[bookViewing.title]);

  // animate fade animation for scrubber page indicator
  useEffect(() => {
    if (showScrubberPage) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        },
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        },
      ).start();
    }
  }, [showScrubberPage, fadeAnim]);

  const handleValueChange = (value: number): void => {
    setScrubberPage(Math.round(value));
  };

  const handleFinishChange = (value: number): void => {
    setScrubberPage(Math.round(value));
    setPage(Math.round(value));
    setShowScubberPage(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Animated.Text
          style={[
            styles.slideIndicator,
            { opacity: fadeAnim },
          ]}
        >
          {scrubberPage}
        </Animated.Text>
        <Slider
          value={currentPage[bookViewing.title]}
          style={styles.slider}
          minimumValue={1}
          maximumValue={bookViewing.pageCount}
          minimumTrackTintColor={gray700}
          maximumTrackTintColor={gray700}
          thumbTintColor={gray500}
          onValueChange={handleValueChange}
          onSlidingComplete={handleFinishChange}
          onSlidingStart={() => setShowScubberPage(true)}
        />
      </View>
      <Text style={styles.pageIndicator}>
        {`${currentPage[bookViewing.title]} of ${bookViewing.pageCount}`}
      </Text>
    </SafeAreaView>
  );
};

export default ReaderBar;
