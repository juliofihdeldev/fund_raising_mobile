import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import TextComponent from './atom/CustomText';
import {Color, boxShadow} from '../assets/GlobalStyles';
import {imagesitem13x} from '../assets/images';
import {currency} from '../utils/currency';
import CustomImage from './atom/CustomImage';

interface UserCommentItemProps {
  onPress: () => void;
  comment: string;
  amount?: number;
  name?: string;
  item?: any;
}

const UserCommentItem: React.FC<UserCommentItemProps> = ({onPress, item}) => {
  let {
    message,
    amount_donation,
    sender: {name, image},
  } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <CustomImage image={image} style={[styles.imagesStyle]} />
        <View style={styles.containerText}>
          <TextComponent color={Color.black} fontWeight="bold">
            {name} has donated {currency(amount_donation)}
          </TextComponent>
          <TextComponent fontSize={14} color={Color.black}>
            {message}
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
    height: 'auto',
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
    paddingLeft: 12,
    marginEnd: 52,
  },
});

export default UserCommentItem;
