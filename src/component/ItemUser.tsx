import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import TextComponent from './atom/CustomText';
import {Color, boxShadow} from '../assets/GlobalStyles';

// create props interface
interface ItemUserProps {
  onPress: () => void;
  image: string;
  name: string;
  isOrganization?: boolean;
  address?: string;
  contactButton: () => React.ReactNode;
}

const ItemUser: React.FC<ItemUserProps> = ({
  onPress,
  image,
  name,
  address,
  isOrganization,
  contactButton,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <Image
          source={image}
          style={[styles.imagesStyle, boxShadow]}
          resizeMode="cover"
        />
        <View style={styles.containerText}>
          {isOrganization && (
            <TextComponent
              numberOfLines={2}
              fontSize={13}>
              Organizing By
            </TextComponent>
          )}
          <TextComponent color={Color.black}>
            {name}
          </TextComponent>
          <TextComponent fontSize={13} color={Color.black}>
            {address}
          </TextComponent>
        </View>
        <View>{contactButton()}</View>
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
    paddingLeft: 4,
    width: '60%',
  },
});

export default ItemUser;
