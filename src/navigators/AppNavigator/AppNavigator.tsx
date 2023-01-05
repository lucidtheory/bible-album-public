import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReaderScreen from 'screens/App/ReaderScreen';
import Routes from 'navigators/routes';
import { white } from 'lib/palette';
import HomeNavigator from './HomeNavigator';
import styles from './AppNavigator.styles';

const AppNavigator = (): ReactElement => {
  const App = createNativeStackNavigator();

  return (
    <App.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{ headerShown: true }}
    >
      <App.Screen
        name={Routes.Home}
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <App.Screen
        name={Routes.Reader}
        component={ReaderScreen}
        options={{
          title: 'Reader',
          headerTitleAlign: 'center',
          headerStyle: styles.readerHeader,
          headerTitleStyle: styles.readerHeaderTitle,
          headerBackTitleVisible: false,
          headerTintColor: white,
        }}
      />
    </App.Navigator>
  );
};

export default AppNavigator;
