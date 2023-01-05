import React, { ReactElement, Ref } from 'react';
import {
  SectionList,
  SectionListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import debounce from 'lib/debounce';
import useEventTrack from 'hooks/useEventTrack';

interface IAnalyticsSectionList extends SectionListProps<any, any> {
  listName: string;
}

const AnalyticsFlatList = React.forwardRef(({
  listName,
  onScrollEndDrag,
  onRefresh,
  onEndReached,
  refreshing,
  ...props
}: IAnalyticsSectionList,
ref: Ref<SectionList>): ReactElement => {
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

  const handleOnEndReached = (e: { distanceFromEnd: number }) => {
    eventTrack(`reached-end-of-list: ${listName}`, e);
    if (onEndReached) {
      onEndReached(e);
    }
  };

  const handleRefresh = () => {
    eventTrack(`pull-down-refreshing-list: ${listName}`);
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <SectionList
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
  );
});

export default AnalyticsFlatList;
