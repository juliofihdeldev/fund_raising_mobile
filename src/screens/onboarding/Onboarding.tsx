import React from 'react';
import {View, StyleSheet, Dimensions, Modal, FlatList} from 'react-native';
// import Animated, {
//   useAnimatedScrollHandler,
//   useSharedValue,
// } from 'react-native-reanimated';
import {Color} from '../../assets/GlobalStyles';
import {Dot, Page} from './Slide';
import CustomButton from '../../component/atom/CustomButton';
import {
  collect_money,
  explore,
  share_with_friend,
  tell_story,
} from '../../assets/images';

/** calculate diagonal of the screen of device */
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

const OnBoarding = ({navigation}: any) => {
  const WORDS = [
    {
      id: 1,
      head: 'Racontez votre histoire',
      des: "Votre histoire unique est votre superpouvoir. Laissez le monde l'entendre. 📖✨",
      img: tell_story,
    },
    {
      id: 2,
      head: 'Partagez avec des amis',
      des: 'Partagez la passion avec des amis. Propagez la joie !',
      img: share_with_friend,
    },
    {
      id: 3,
      head: "Commencez à collecter de l'argent",
      des: "Laissez-nous lancer votre aventure de collecte de fonds ! Commencez à collecter dès aujourd'hui.",
      img: collect_money,
    },
    {
      id: 4,
      head: 'Allez changer le monde',
      des: 'Vous avez le pouvoir de faire la différence.',
      img: explore,
    },
  ];

  // const translateX = useSharedValue(0);

  /** handle Translation on scroll event  */
  // const scrollHandler = event => {
  //   translateX.value = event.contentOffset.x;
  // };
  let translateX = 0;

  return (
    <Modal style={style.pageContainer}>
      <FlatList
        data={WORDS}
        // onScroll={scrollHandler}
        initialScrollIndex={0}
        snapToInterval={PAGE_WIDTH}
        decelerationRate="fast"
        scrollEventThrottle={16}
        horizontal
        style={style.container2}
        pagingEnabled={true}
        bounces={true}
        bouncesZoom={true}
        initialNumToRender={1}
        keyExtractor={item => item.key}
        renderItem={({index, item}) => {
          return (
            <Page
              key={index.toString()}
              index={index}
              title={item}
              img={item.img}
              translateX={translateX}
            />
          );
        }}
      />
      <Dot data={WORDS} translateX={translateX} color={Color.primary} />
      <View style={style.container}>
        <CustomButton
          title={'Let get start'}
          onPress={() => navigation.navigate('MainNavigation')}
          buttonStyle={style.buttonStyle}
          textStyle={style.textStyle}
        />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 15,
    alignSelf: 'flex-end',
    paddingRight: 16,
  },
  pageContainer: {
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    justifyContent: 'center',
  },
  container2: {flex: 1, backgroundColor: Color.white},
  text: {
    fontSize: 30,
    color: 'rgba(0,0,250,1)',
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    fontSize: 15,
    color: Color.white,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  buttonStyle: {
    width: 'auto',
    backgroundColor: Color.primary,
    borderRadius: 26,
  },
  textStyle: {
    color: Color.primary,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
});

export default OnBoarding;
