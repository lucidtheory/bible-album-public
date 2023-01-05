import { useRoute } from '@react-navigation/native';
import { logEvent } from 'lib/modules/Amplitude';

type EventAttributesType = {
  [key: string]: any
}

type EventTrackFunctionType = (
  eventType: string,
  eventAttributes?: EventAttributesType
) => void;

const useEventTrack = (): EventTrackFunctionType => {
  const { name: routeName } = useRoute();

  return (
    eventType: string,
    eventAttributes?: EventAttributesType,
  ) => logEvent({
    eventType,
    attributes: {
      ...eventAttributes,
      route: routeName,
    },
  });
};

export default useEventTrack;
