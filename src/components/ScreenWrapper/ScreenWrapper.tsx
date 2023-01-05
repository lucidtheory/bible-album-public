import React, { ReactElement, useEffect } from 'react';
import { ViewStyle, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import useEventTrack from 'hooks/useEventTrack';

interface IScreenWrapper {
  children: any
  style?: ViewStyle
}

const ScreenWrapper = ({ children, style }: IScreenWrapper): ReactElement => {
  const isFocused = useIsFocused();
  const eventTrack = useEventTrack();

  useEffect(() => {
    if (isFocused) {
      eventTrack('navigated-to-screen');
    }
  }, [isFocused, eventTrack]);

  return (
    <View style={style}>
      {children}
    </View>
  );
};

ScreenWrapper.defaultProps = {
  style: undefined,
};

export default ScreenWrapper;
