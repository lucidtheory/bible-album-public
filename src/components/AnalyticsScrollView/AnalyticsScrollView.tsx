import React, { ReactElement, Ref } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import debounce from 'lib/debounce';
import useEventTrack from 'hooks/useEventTrack';

interface IAnalyticsScrollView extends ScrollViewProps {
  contentDescription: string;
}

const AnalyticsFlatList = React.forwardRef(({
  contentDescription,
  onScrollEndDrag,
  children,
  ...props
}: IAnalyticsScrollView,
ref: Ref<ScrollView>): ReactElement => {
  const eventTrack = useEventTrack();

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    eventTrack(`scrolling-through-content: ${contentDescription}`, { details: {
      contentOffset: e.nativeEvent.contentOffset,
      velocity: e.nativeEvent.velocity,
    } });
    if (onScrollEndDrag) {
      onScrollEndDrag(e);
    }
  };

  return (
    <ScrollView
      {...props}
      onScrollEndDrag={debounce(handleScrollEnd, 2000)}
      ref={ref}
    >
      {children}
    </ScrollView>
  );
});

export default AnalyticsFlatList;
