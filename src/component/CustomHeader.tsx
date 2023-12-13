import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextComponent from './atom/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationIcon from './atom/NotificationIcon';
import {Color} from '../assets/GlobalStyles';

interface SearchBarProps {
  placeholder?: string;
  goToSearch?: () => void;
  navigation?: unknown;
}

const CustomHeader: React.FC<SearchBarProps> = () => {
  // how to show an env variable
  return (
    <View style={styles.searchContainer}>
      <TextComponent
        fontSize={32}
        fontFamily="LilitaOne-Regular"
        color={Color.primary}
        style={styles.logoColor}>
        POTE KOLE
      </TextComponent>

      <NotificationIcon count={3} style={styles.notificationIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
  searchContainer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  notificationIcon: {
    marginLeft: 8,
  },

  logoColor: {
    color: Color.primary,
  },
});

export default CustomHeader;
