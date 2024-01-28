import React from 'react';
import {StyleSheet, Dimensions, View, Image} from 'react-native';
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const SIZE = PAGE_WIDTH * 0.7;
const dgl = PAGE_WIDTH;

const Page = (props: any) => {
  return null;
};

const Dot = (props: any) => {
  const {data, translateX, style, color} = props;

  return (
    <View>
      <Text> Hi </Text>
    </View>
  );
};

const Style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    position: 'absolute',
  },
  square: {
    height: SIZE / 1.9,
    width: SIZE / 1.9,
    backgroundColor: Color.white,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: SIZE / 1.2,
  },
  text: {
    textAlign: 'left',
    marginHorizontal: 16,
  },
  text2: {
    textAlign: 'left',
    marginHorizontal: 16,
  },
  dot: {
    height: 8,
    margin: 5,
    borderRadius: 10,
  },
  containerSpace: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT / 1.7,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textContainer: {
    color: Color.white,
    marginLeft: 16,
    marginTop: 40,
    width: '70%',
  },
  defaultStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 25,
    marginLeft: 25,
  },
  headerStyle: {
    marginTop: 40,
    marginLeft: 16,
  },
});
export {Page, Dot};
