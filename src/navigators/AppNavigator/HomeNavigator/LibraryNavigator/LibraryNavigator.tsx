import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibraryScreen from 'screens/App/Home/Library/LibraryScreen';
import Routes from 'navigators/routes';
import styles from './LibraryNavigator.styles';

const LibraryNavigator = (): ReactElement => {
  const Library = createNativeStackNavigator();

  return (
    <Library.Navigator
      initialRouteName={Routes.LibraryMain}
      screenOptions={{ headerShown: true }}
    >
      <Library.Screen
        name={Routes.LibraryMain}
        component={LibraryScreen}
        options={{
          title: 'Library',
          headerTitleAlign: 'center',
          headerLargeTitle: true,
          headerTitleStyle: styles.headerText,
          headerLargeTitleStyle: styles.headerText,
        }}
      />
    </Library.Navigator>
  );
};

export default LibraryNavigator;
