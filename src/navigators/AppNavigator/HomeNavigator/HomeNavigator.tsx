import React, { ReactElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Routes from 'navigators/routes';
import Ionicons from '@expo/vector-icons/Ionicons';
import LibraryNavigator from './LibraryNavigator';
import ServiceNavigator from './ServiceNavigator';

const HomeNavigator = (): ReactElement => {
  const Home = createBottomTabNavigator();

  return (
    <Home.Navigator
      initialRouteName={Routes.Library}
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Home.Screen
        name={Routes.Library}
        component={LibraryNavigator}
        options={{
          tabBarAccessibilityLabel: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="library-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Home.Screen
        name={Routes.Services}
        component={ServiceNavigator}
        options={{
          tabBarAccessibilityLabel: 'Services',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Home.Navigator>
  );
};

export default HomeNavigator;
