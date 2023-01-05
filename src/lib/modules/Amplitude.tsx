import { Amplitude } from '@amplitude/react-native';
import getEnvironment from 'lib/getEnvironment';
import {
  IEventDetails,
} from 'types/analytics';

let isInitialized = false;

export function initialize(): void {
  if (isInitialized || !getEnvironment().analyticsAPIKey) {
    return;
  }

  Amplitude.getInstance().init(getEnvironment().analyticsAPIKey);
  isInitialized = true;
}

export function logEvent(eventDetails: IEventDetails): void {
  const event = {
    eventName: eventDetails.eventType,
    options: {
      attributes: eventDetails.attributes,
    },
  };

  if (isInitialized) {
    Amplitude.getInstance().logEvent(event.eventName, event.options);
  }
}
