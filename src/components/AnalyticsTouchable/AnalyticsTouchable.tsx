import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import useEventTrack from 'hooks/useEventTrack';

export interface IAnalyticsTouchable extends TouchableOpacityProps {
  onPress: any;
  eventType: string;
  eventAttributes?: {
    [key: string]: any
  }
}

const AnalyticsTouchable = ({
  children,
  onPress,
  eventType,
  eventAttributes,
  ...props
}: IAnalyticsTouchable): ReactElement => {
  const eventTrack = useEventTrack();

  const handlePress = (): void => {
    eventTrack(eventType, eventAttributes);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

AnalyticsTouchable.defaultProps = {
  eventAttributes: undefined,
};

export default AnalyticsTouchable;
