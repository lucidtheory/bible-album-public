import React, { ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from 'screens/App/Home/Services/ServicesScreen';
import AboutScreen from 'screens/App/Home/Services/AboutScreen';
import Routes from 'navigators/routes';
import styles from './ServiceNavigatior.styles';

const ServiceNavigator = (): ReactElement => {
  const Service = createNativeStackNavigator();

  return (
    <Service.Navigator
      initialRouteName={Routes.ServicesMain}
      screenOptions={{ headerShown: true }}
    >
      <Service.Screen
        name={Routes.ServicesMain}
        component={ServicesScreen}
        options={{
          title: 'Services',
          headerTitleAlign: 'center',
          headerLargeTitle: true,
          headerTitleStyle: styles.headerText,
          headerLargeTitleStyle: styles.headerText,
        }}
      />
      <Service.Screen
        name={Routes.About}
        component={AboutScreen}
        options={{
          title: 'About',
          headerTitleAlign: 'center',
          headerLargeTitle: false,
          presentation: 'modal',
          headerTitleStyle: styles.headerText,
          headerLargeTitleStyle: styles.headerText,
        }}
      />
    </Service.Navigator>
  );
};

export default ServiceNavigator;
