import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomBackIconProps {
  style?: StyleProp<ViewStyle>;
  name?: string;
  size?: number;
  color?: string;
  onPress: () => void;
}

const CustomBackIcon: React.FC<CustomBackIconProps> = ({
  style,
  name = 'notifications-outline',
  size = 24,
  color = '#333',
  onPress
}) => {
  return (
    <TouchableOpacity 
        style={[styles.container, style]} 
        onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomBackIcon;
