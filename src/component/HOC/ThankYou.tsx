import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Color } from '../../assets/GlobalStyles';
import TextComponent from '../atom/CustomText';
import CustomImage from '../atom/CustomImage';
import { collect_money, share_with_friend } from '../../assets/images';


const ThankYou  = ({message}: any) =>  { 
  return (
    <View style={{ flex: 1,  alignItems:'center' }}>
        <Image
          source={share_with_friend}
          style={{
              width: 120,
              height:120,

          }}
        />
        <TextComponent color='#333' fontSize={18}>
          {message} 
        </TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default ThankYou;
