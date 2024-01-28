import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import TextComponent from '../atom/CustomText';
import {share_with_friend} from '../../assets/images';

const ThankYou = ({message}: any) => {
  return (
    <View style={styles.container}>
      <Image source={share_with_friend} style={styles.image} />
      <TextComponent color="#333" fontSize={18}>
        {message}
      </TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  image: {width: 120, height: 120},
});

export default ThankYou;
