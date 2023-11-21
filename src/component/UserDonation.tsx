import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import TextComponent from './atom/CustomText';
import {Color, boxShadow} from '../assets/GlobalStyles';
import {currency} from '../utils/currency';
import {DonationType} from '../types/Index';
import CustomImage from './atom/CustomImage';

interface UserDonationProps {
  onPress: () => void;
  item?: DonationType;
}

const UserDonation: React.FC<UserDonationProps> = ({onPress, item}) => {
  let {amount, image, user_name} = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <CustomImage image={image} style={[styles.imagesStyle, boxShadow]} />
        <View style={styles.containerText}>
          <TextComponent fontSize={15} color={Color.black}>
            {user_name}
          </TextComponent>
          <TextComponent fontSize={15} color={Color.black} fontWeight="bold">
            {currency(amount)}
          </TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    height: 64,
    marginTop: 12,
    backgroundColor: '#fff',
  },
  imagesStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  containerText: {
    height: 124,
    paddingLeft: 12,
    width: '60%',
    marginTop: 8,
  },
});

export default UserDonation;
