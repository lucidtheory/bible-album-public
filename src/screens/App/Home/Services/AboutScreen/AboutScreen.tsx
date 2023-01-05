import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import ScreenWrapper from 'components/ScreenWrapper';
import AnalyticsScrollView from 'components/AnalyticsScrollView';
import copy from './copy';
import styles from './AboutScreen.styles';

const AboutScreen = (): ReactElement => (
  <ScreenWrapper style={styles.container}>
    <AnalyticsScrollView
      contentDescription="about-the-app-copy"
      contentContainerStyle={styles.scroll}
    >
      <Text style={styles.text}>{copy}</Text>
    </AnalyticsScrollView>
  </ScreenWrapper>
);

export default AboutScreen;
