import React from 'react';
import {View, StyleSheet} from 'react-native';

interface SearchBarProps {
  placeholder: string;
}

const CustomHeader: React.FC<SearchBarProps> = ({placeholder}) => {
  return (
    <View style="{feedStyles.headerContainer}">
      <NotificationIcon
        onPress={() => null}
        name="arrow-back-outline"
        style={[styles.icon, {backgroundColor: 'white', marginLeft: -10}]}
      />
      <NotificationIcon
        name="heart-outline"
        style="{feedStyles.notificationIcon}"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomHeader;
