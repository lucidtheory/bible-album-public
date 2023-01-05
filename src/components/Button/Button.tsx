import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import AnalyticsTouchable from 'components/AnalyticsTouchable';
import styles from './Button.styles';

interface IButton {
  onPress: any
  icon: string
  title: string
  style?: any
}
const Button = ({ onPress, icon, title, style }: IButton): ReactElement => (
  <AnalyticsTouchable
    onPress={onPress}
    eventType={`tap-button-of-title: ${title}`}
    style={[styles.touchable, style]}
  >
    <Text style={styles.title}>{title}</Text>
    <Icon
      name={icon}
      style={styles.icon}
    />
  </AnalyticsTouchable>
);

Button.defaultProps = {
  style: undefined,
};

export default Button;
