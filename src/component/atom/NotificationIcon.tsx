import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Text} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

interface NotificationIconProps {
  style?: StyleProp<ViewStyle>;
  count?: number;
  name?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  style,
  count,
  name = 'notifications-outline',
}) => {
  return (
    <View
      style={[styles.container, style]}
      testID="notification-icon-container">
      <Ionicons name={name} size={24} color="#333" testID="default-icon" />
      {count && (
        <View style={styles.badgeContainer} testID="badge-container">
          <Text style={styles.badgeText} testID="badge-text">
            {count}
          </Text>
        </View>
      )}
    </View>
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

export default NotificationIcon;
