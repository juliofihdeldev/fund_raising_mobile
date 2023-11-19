import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import {ProjectType} from '../../types/Index';
import {projects} from '../../mock/feeds';
import {GlobalStyles} from './GlobalStyle';
import {imagesitem13x, imagesitem33x, user3x} from '../../assets/images';
import TextComponent from '../../component/atom/CustomText';
import CustomProgressBar from '../../component/atom/CustomProgressBar';
import CustomButton from '../../component/atom/CustomButton';
import ItemUser from '../../component/ItemUser';
import {ScrollView} from 'react-native-virtualized-view';
import UserDonation from '../../component/UserDonation';
import UserCommentItem from '../../component/UserCommentItem';
import {Color, boxShadow} from '../../assets/GlobalStyles';
import {useLang} from '../../context/LanguageContext';

import CustomBackIcon from '../../component/atom/CustomBackIcon';

const FeedDetails: React.FC<ProjectType> = ({navigation, item}: any) => {
  const [readMore, setReadMore] = React.useState(false);
  const handleSetReadMore = () => {
    setReadMore(!readMore);
  };

  navigation.setOptions({
    headerShown: false,
  });

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 124);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 124],
    outputRange: [0, -124],
  });

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Animated.View
        style={[
          styles.headerStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: translateY ? '#fff' : 'transparent',
            transform: [{translateY: translateY}],
          },
        ]}>
        <CustomBackIcon
          name="close-outline"
          size={28}
          color={Color.primary}
          onPress={() => navigation.goBack()}
        />
        <TextComponent color="#000" numberOfLines={3}>
          $26,269 USD raised of $20,000 goal • 1.2K donations
        </TextComponent>
      </Animated.View>

      <ScrollView
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}>
        <View style={GlobalStyles.containerDetailsItem}>
          <View style={GlobalStyles.projectContainerDetails}>
            <View>
              <View style={[GlobalStyles.imagesView]}>
                <Image
                  source={imagesitem13x}
                  style={GlobalStyles.image}
                  resizeMode="cover"
                />

                <View style={styles.textContentStyle}>
                  <TextComponent
                    fontSize={19}
                    color="#fff"
                    showTextShadow={true}
                    fontWeight="bold"
                    numberOfLines={2}>
                    Let’s Give Reggie A Life Changing Gift! Changing Gift after
                    20 years of
                  </TextComponent>
                </View>
              </View>

              <View style={[GlobalStyles.contentText]}>
                <CustomProgressBar value={65} />

                <View style={[GlobalStyles.contentTextPrice, {marginTop: 12}]}>
                  <TextComponent numberOfLines={2}>
                    $26,269 USD raised of $20,000 goal • 1.2K donations
                  </TextComponent>
                </View>

                <CustomButton
                  title={useLang().lang.make_donnation}
                  onPress={() => console.log('Button')}
                  buttonStyle={styles.buttonStyle}
                />

                <CustomButton
                  title={useLang().lang.myShare}
                  onPress={() => console.log('Button')}
                  buttonStyle={styles.shareButtonStyle}
                />

                <View style={styles.containerItemStyle}>
                  <ItemUser
                    onPress={() => {}}
                    image={imagesitem33x}
                    name="@JUlio"
                    address="Port-au-Prince, Haiti"
                    isOrganization={true}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    contactButton={() => (
                      <CustomButton
                        title="Contact"
                        onPress={() => console.log('Button')}
                        buttonStyle={[boxShadow, styles.buttonStylesContact]}
                      />
                    )}
                  />
                </View>

                <View style={styles.containerStat}>
                  <TextComponent numberOfLines={2}>
                    Created 3 days ago
                  </TextComponent>

                  <TextComponent numberOfLines={2}>Donation</TextComponent>

                  <TextComponent numberOfLines={2}>Views 1.2K</TextComponent>
                </View>
              </View>

              <View style={styles.contentTextStyle}>
                <TextComponent
                  numberOfLines={readMore ? 0 : 5}
                  style={GlobalStyles.description}>
                  I was walking and saw this guy playing basketball so I
                  introduced myself and his name was Reggie. I told him my ball
                  had been stolen and asked if I could shoot around with him and
                  out of the kindness of his heart he said yes forsure! I then
                  surprised Reggie with $500 for his kindness. He began telling
                  me his life story how his dream is to make it to the NBA and
                  ever since he was 13 he had been in and out of homelessness.
                  His friend just passed away and Reggie has been hit with storm
                  after storm to derail him from his dream. Let’s raise some
                  funds to bless Reggie with so he never has to worry about
                  being on the streets again and can pursue his dreams!
                </TextComponent>

                <TouchableOpacity
                  style={GlobalStyles.contentTextPrice}
                  onPress={handleSetReadMore}>
                  <TextComponent>
                    {!readMore ? 'Read more' : 'Read less'}
                  </TextComponent>
                </TouchableOpacity>
              </View>

              <View style={styles.contentTextStyle}>
                <TextComponent
                  fontSize={21}
                  fontWeight="bold"
                  numberOfLines={2}>
                  Donations (1.2K)
                </TextComponent>

                <View>
                  <TextComponent fontWeight="bold" fontSize={19}>
                    120 people just donated
                  </TextComponent>

                  <FlatList
                    horizontal={false}
                    data={projects as ProjectType[]}
                    renderItem={({item}) => (
                      <UserDonation
                        onPress={() => {}}
                        image={imagesitem33x}
                        name="@JUlio"
                        amount={150.0}
                      />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={GlobalStyles.container}
                  />
                </View>
              </View>

              <View style={styles.contentTextStyle}>
                <TextComponent
                  fontWeight="bold"
                  fontSize={19}
                  numberOfLines={2}>
                  Words of support (700)
                </TextComponent>

                <FlatList
                  horizontal={false}
                  data={projects as ProjectType[]}
                  renderItem={({item}) => (
                    <UserCommentItem
                      onPress={() => {}}
                      amount={150}
                      name="@JUlio"
                      comment="Lorem ipsum dolor sit amet consectetur elit."
                    />
                  )}
                  keyExtractor={item => item.id}
                  contentContainerStyle={GlobalStyles.container}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStat: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderBottomColor: Color.grayLight,
    borderBottomWidth: 1,
    paddingBottom: 16,
    paddingTop: 16,
    borderTopColor: Color.grayLight,
    borderTopWidth: 1,
  },
  textContentStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginBottom: 16,
    marginLeft: 12,
  },
  headerStyle: {
    position: 'absolute',
    zIndex: 1,
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  buttonStyle: {
    backgroundColor: Color.primary,
    width: '100%',
    borderRadius: 26,
    marginTop: 16,
  },
  shareButtonStyle: {
    backgroundColor: Color.secondary,
    width: '100%',
    borderRadius: 26,
    marginTop: 16,
  },
  containerItemStyle: {
    backgroundColor: 'transparent',
    marginTop: 16,
  },
  buttonStylesContact: {
    backgroundColor: Color.black,
    width: '100%',
    borderRadius: 26,
    marginTop: 8,
  },
  contentTextStyle: {padding: 16},
});
export default FeedDetails;
