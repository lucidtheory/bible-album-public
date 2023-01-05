import { NavigationContainerRef } from '@react-navigation/native';
import React, { Ref } from 'react';
import Routes from './routes';

export const navigationRef:Ref<NavigationContainerRef<any>> = React.createRef();

export const navigate = (name:Routes, params:any) => {
  navigationRef.current?.navigate(name, params);
};

export const reset = (routes:Array<{ name: Routes }>) => {
  navigationRef.current?.reset({ index: 0, routes });
};

export const goBack = () => navigationRef.current?.goBack();
