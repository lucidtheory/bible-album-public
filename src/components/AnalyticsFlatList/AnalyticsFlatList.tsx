import React, { ReactElement, Ref } from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import debounce from 'lib/debounce';
import useEventTrack from 'hooks/useEventTrack';

interface IAnalyticsFlashList extends FlashListProps<any> {
  listName: string;
  contentContainerStyle: any
}

const AnalyticsFlashList = React.forwardRef(({
  listName,
  onScrollEndDrag,
  onRefresh,
  onEndReached,
  refreshing,
  contentContainerStyle,
  ...props
}: IAnalyticsFlashList,
ref: Ref<FlashList<any>>): ReactElement => {
  const eventTrack = useEventTrack();

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    eventTrack(`scrolling-through-list: ${listName}`, { details: {
      contentOffset: e.nativeEvent.contentOffset,
      velocity: e.nativeEvent.velocity,
    } });
    if (onScrollEndDrag) {
      onScrollEndDrag(e);
    }
  };

  const handleOnEndReached = () => {
    eventTrack(`reached-end-of-list: ${listName}`);
    if (onEndReached) {
      onEndReached();
    }
  };

  const handleRefresh = () => {
    eventTrack(`'pull-down-refreshing-list: ${listName}`);
    if (onRefresh) {
      onRefresh();
    }
  };
  return (
    <View style={contentContainerStyle}>
      <FlashList
        {...props}
        onScrollEndDrag={debounce(handleScrollEnd, 2000)}
        onEndReached={debounce(handleOnEndReached, 2000)}
        refreshing={refreshing}
        onRefresh={
          typeof refreshing === 'boolean'
            ? debounce(handleRefresh, 2000)
            : undefined
        }
        ref={ref}
      />
    </View>
  );
});

export default AnalyticsFlashList;
