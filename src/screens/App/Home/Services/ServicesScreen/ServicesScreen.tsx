import React, { ReactElement, useRef } from 'react';
import { Text, View, Animated, Share } from 'react-native';
import AnalyticsTouchable from 'components/AnalyticsTouchable';
import Button from 'components/Button';
import Clipboard from '@react-native-clipboard/clipboard';
import { useDispatch } from 'store/hooks';
import ScreenWrapper from 'components/ScreenWrapper';
import getVersion from 'lib/getVersion';
import { ServiceEpicActions } from 'store/sagas/epics/services';
import styles from './ServicesScreen.styles';

const SHARE_MESSAGE = 'Check out The Bible Album. It\'s on the iOS and Android app stores: https://apps.apple.com/us/app/bible-album/id6443950848 https://play.google.com/store/apps/details?id=com.etrainlearning.biblememorybook';

const ServicesScreen = (): ReactElement => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleAbout = (): void => {
    dispatch({ type: ServiceEpicActions.VIEW_ABOUT });
  };

  const handleShare = async (): Promise<void> => {
    try {
      await Share.share({ message: SHARE_MESSAGE });
    } catch (err) {
      console.log('share error', err);
    }
  };

  const copyToClipboard = (): void => {
    Clipboard.setString('etrainart@gmail.com');
    startFadeAnimation();
  };

  const startFadeAnimation = (): void => {
    Animated.sequence([
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          delay: 1000,
        },
      ),
    ]).start();
  };

  return (
    <ScreenWrapper style={styles.container}>
      <Button
        title="About This Series"
        icon="bulb-outline"
        onPress={handleAbout}
        style={styles.button}
      />
      <Button
        title="Share"
        icon="earth"
        onPress={handleShare}
      />
      <View style={styles.bottomTextContainer}>
        <Animated.Text style={[styles.copyMessage, { opacity: fadeAnim }]}>
          email copied!
        </Animated.Text>
        <Text style={styles.smallText}>{getVersion()}</Text>
        <Text style={styles.smallText}>Reviews and shares much appreciated! ❤️</Text>
        <AnalyticsTouchable
          hitSlop={{ top: 10, bottom: 10 }}
          eventType="tap-to-copy-contact"
          onPress={copyToClipboard}
          activeOpacity={1}
        >
          <Text>
            <Text style={styles.smallText}>Contact: </Text>
            <Text style={styles.email}>etrainart@gmail.com</Text>
          </Text>
        </AnalyticsTouchable>
      </View>
    </ScreenWrapper>
  );
};

export default ServicesScreen;
