import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import loader from 'assets/book-loader.json';
import styles from './Loading.styles';

const Loading = (): ReactElement => (
  <View style={styles.container}>
    <LottieView
      autoPlay
      source={loader}
      speed={1}
      style={styles.lottie}
    />
    <Text style={styles.text}>One moment, fetching books..</Text>
  </View>
);

export default Loading;
