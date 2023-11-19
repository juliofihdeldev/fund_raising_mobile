import React from 'react';
import {StyleSheet, Dimensions, View, Image} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const SIZE = PAGE_WIDTH * 0.7;
const dgl = PAGE_WIDTH;

const Page = (props: any) => {
  const {index, title, translateX, onPress, img} = props;

  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];

  const rstyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale: scale}],
      // transform: [{ rotate: scale }],
      borderRadius,
    };
  });
  const textStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [PAGE_HEIGHT / 2, 0, PAGE_HEIGHT / 2],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-4, 1, -4],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY: scale}],
    };
  });

  return (
    <>
      <Animated.View style={[rstyle, Style.square]} />
      <Animated.View style={[textStyle]}>
        <TextComponent
          fontSize={41}
          fontFamily="LilitaOne-Regular"
          style={Style.headerStyle}>
          POTE KOLE
        </TextComponent>
      </Animated.View>
      <View style={Style.pageContainer}>
        <View style={Style.container2}>
          <Image
            width={dgl * 0.99}
            height={dgl * 0.99}
            resizeMode="center"
            source={img}
          />
        </View>

        <Animated.View style={[textStyle, Style.container]}>
          <View style={Style.containerSpace} />
          <TextComponent
            fontFamily="LilitaOne-Regular"
            fontWeight="bold"
            fontSize={23}
            style={Style.text}>
            {title?.head}
          </TextComponent>
          <TextComponent fontSize={15} fontWeight="bold" style={Style.text2}>
            {title?.des}
          </TextComponent>
        </Animated.View>
      </View>
    </>
  );
};

const Dot = (props: any) => {
  const {data, translateX, style, color} = props;

  return (
    <View>
      <View style={style ? style : Style.defaultStyle}>
        {data.map((_, index: any) => {
          const inputRange = [
            (index - 1) * PAGE_WIDTH,
            index * PAGE_WIDTH,
            (index + 1) * PAGE_WIDTH,
          ];
          const textStyle = useAnimatedStyle(() => {
            const size = interpolate(
              translateX.value,
              inputRange,
              [10, 25, 10],
              Extrapolate.CLAMP,
            );

            const opacity = interpolate(
              translateX.value,
              inputRange,
              [0.5, 2, 0.5],
              Extrapolate.CLAMP,
            );

            return {
              width: size,
              opacity,
              backgroundColor: color,
            };
          });
          return (
            <Animated.View
              style={[Style.dot, textStyle]}
              key={index.toString()}
            />
          );
        })}
      </View>
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
