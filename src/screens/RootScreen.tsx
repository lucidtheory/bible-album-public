/* eslint-disable camelcase */
import React, { ReactElement, useCallback } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigators/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { initialize } from 'lib/modules/Amplitude';
import { activateAppCheck } from 'lib/firebaseAppCheck';
import { navigationRef } from 'navigators/navigationRef';
import { PersistGate } from 'redux-persist/integration/react';
import { RootSagaActions } from 'store/sagas';
import {
  useFonts as useCinzel,
  Cinzel_400Regular,
} from '@expo-google-fonts/cinzel';
import {
  useFonts as useCinzelDecorative,
  CinzelDecorative_400Regular,
} from '@expo-google-fonts/cinzel-decorative';
import {
  useFonts as useJosefin,
  JosefinSans_400Regular,
  JosefinSans_300Light,
} from '@expo-google-fonts/josefin-sans';
import startStore from 'store';

LogBox.ignoreLogs([
  '`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.',
  '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
]);

const { persistor, store } = startStore();
initialize();
activateAppCheck();

SplashScreen.preventAutoHideAsync();

const RootScreen = (): ReactElement => {
  const [cinzelLoaded] = useCinzel({
    Cinzel_400Regular,
  });
  const [cinzelDecorativeLoaded] = useCinzelDecorative({
    CinzelDecorative_400Regular,
  });
  const [josefinLoaded] = useJosefin({
    JosefinSans_400Regular,
    JosefinSans_300Light,
  });

  const onLayout = useCallback(() => {
    if (cinzelLoaded && cinzelDecorativeLoaded && josefinLoaded) {
      setTimeout((): Promise<boolean> => SplashScreen.hideAsync(), 500);
    }
  }, [cinzelLoaded, cinzelDecorativeLoaded, josefinLoaded]);

  if (!(cinzelLoaded && cinzelDecorativeLoaded && josefinLoaded)) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayout}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => store.dispatch({ type: RootSagaActions.LOAD_APP })}
          >
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootScreen;
