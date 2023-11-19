import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {imagesitem23x} from '../assets/images';
import TextComponent from './atom/CustomText';
import {Color} from '../assets/GlobalStyles';
import CustomProgressBar from './atom/CustomProgressBar';
import {currency} from '../utils/currency';

// create props interface
interface ItemDonationVerticalProps {
  onPress: () => void;
}

const ItemDonationVertical: React.FC<ItemDonationVerticalProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <Image
          source={imagesitem23x}
          style={styles.imagesStyle}
          resizeMode="stretch"
        />
        <View style={styles.containerText}>
          <TextComponent numberOfLines={2} fontSize={15}>
            Lorem ipsum dolor sit amet consectetur elit. Lorem ipsum dolor sit
            amet consectetur elit. Lorem ipsum dolor sit amet consectetur elit.
          </TextComponent>
          <TextComponent fontSize={15} color={Color.black} fontWeight="bold">
            @jUlio
          </TextComponent>
          <View>
            <CustomProgressBar value={80} />
          </View>
          <View style={[styles.containerPriceDate]}>
            <TextComponent fontSize={15} color={Color.black} fontWeight="bold">
              {currency(120)}
            </TextComponent>
            <TextComponent fontSize={13} color={Color.black}>
              3 days left
            </TextComponent>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#fff',
    borderBottomColor: Color.grayLight,
    borderBottomWidth: 1,
  },
  imagesStyle: {
    width: 150,
    height: 120,
    borderRadius: 16,
  },
  containerText: {
    height: 124,
    paddingLeft: 8,
    width: '60%',
  },
  containerPriceDate: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
});

export default ItemDonationVertical;
