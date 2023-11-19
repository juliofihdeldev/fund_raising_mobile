import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {imagesitem13x} from '../assets/images';
import CustomProgressBar from './atom/CustomProgressBar';
import TextComponent from './atom/CustomText';
import {Color, boxShadow} from '../assets/GlobalStyles';

interface ItemDonationProps {
  onPress: () => void;
}

const ItemDonation: React.FC<ItemDonationProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, boxShadow]} onPress={onPress}>
      <View style={styles.imagesView}>
        <Image source={imagesitem13x} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.contentText}>
        <TextComponent numberOfLines={2}>
          Some description about the project Some description about theSome
          description about the project Some description about the project
        </TextComponent>
        <CustomProgressBar value={65} />

        <View style={styles.contentTextPrice}>
          <TextComponent fontWeight='bold' fontSize={14}>HTG 100.00</TextComponent>

          <TextComponent fontSize={15} color={Color.black} >
            Shared
          </TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    height: 245,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  imagesView: {
    height: 140,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentText: {
    margin: 8,
  },
  
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 18,
    marginTop: 8,
    height: 10,
  },
  progressBar: {
    backgroundColor: 'green',
    borderRadius: 18,
    justifyContent: 'center',
  },
  goalText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 8,
  },
  contentTextPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default ItemDonation;
