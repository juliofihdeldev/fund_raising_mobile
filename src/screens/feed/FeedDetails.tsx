import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import {DonationType, ProjectType} from '../../types/Index';
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

import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomBackIcon from '../../component/atom/CustomBackIcon';
import CustomImage from '../../component/atom/CustomImage';
import {formatDate} from '../../utils/dateFormat';
import {currency} from '../../utils/currency';
import {useFunding} from '../../context/FundingContext';
import {useFocusEffect} from '@react-navigation/native';

const FeedDetails: React.FC<ProjectType> = ({
  route,
  navigation,
  setLoading,
}: any) => {
  const [readMore, setReadMore] = React.useState(false);

  const {
    name,
    amount,
    collect,
    id,
    date,
    image,
    description,
    category,
    view_count,
    user: {name: user_name, email, id: user_id},
  } = route?.params?.project;

  const {
    projects,
    donations,
    messages,
    handleGetMessagesByID,
    handleGetProjectByID,
    handleGetDonations,
  } = useFunding();

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        handleGetProjectByID(id),
        handleGetMessagesByID(id),
        handleGetDonations(id),
      ]);
    }
    fetchData();
  }, [id]);

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
          style={styles.iconMargin}
          size={28}
          color={Color.primary}
          onPress={() => navigation.goBack()}
        />
        <TextComponent color="#000" numberOfLines={3} style={styles.titleStyle}>
          $26,269 USD raised of $20,000 goal • 1.2K donations
        </TextComponent>

        <Ionicons
          name="menu-outline"
          size={28}
          color={Color.primary}
          onPress={() => navigation.goBack()}
        />
      </Animated.View>

      <ScrollView
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}>
        <View style={GlobalStyles.containerDetailsItem}>
          <View style={GlobalStyles.projectContainerDetails}>
            <View>
              <View style={[GlobalStyles.imagesView]}>
                <CustomImage image={image} style={GlobalStyles.image} />

                <View style={styles.textContentStyle}>
                  <TextComponent
                    fontSize={19}
                    color="#fff"
                    showTextShadow={true}
                    fontWeight="bold"
                    numberOfLines={2}>
                    {name}
                  </TextComponent>
                </View>
              </View>

              <View style={[GlobalStyles.contentText]}>
                <CustomProgressBar value={65} />

                <View style={[GlobalStyles.contentTextPrice, {marginTop: 12}]}>
                  <TextComponent numberOfLines={2}>
                    {currency(collect)} USD raised of {currency(amount)} goal •
                    1.2K donations
                  </TextComponent>
                </View>

                <CustomButton
                  title={useLang().lang.make_donnation}
                  onPress={() =>
                    navigation.navigate('Payment', {
                      project: route?.params?.project,
                    })
                  }
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
                    Created {formatDate(date)}
                  </TextComponent>

                  <TextComponent numberOfLines={2}>{category}</TextComponent>

                  <TextComponent numberOfLines={2}>
                    Views: {view_count}
                  </TextComponent>
                </View>
              </View>

              <View style={styles.contentTextStyle}>
                <TextComponent
                  numberOfLines={readMore ? 0 : 5}
                  style={GlobalStyles.description}>
                  {description}
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
                  Donations {donations?.length}
                </TextComponent>

                <View>
                  <TextComponent fontWeight="bold" fontSize={15}>
                    {Math.floor(donations?.length / 2.5)} people just donated
                  </TextComponent>

                  <FlatList
                    horizontal={false}
                    data={donations as DonationType[]}
                    renderItem={({item}) => (
                      <UserDonation item={item} onPress={() => {}} />
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
                  Words of support ({messages?.length})
                </TextComponent>

                <FlatList
                  horizontal={false}
                  data={messages as any}
                  renderItem={({item}) => (
                    <UserCommentItem onPress={() => {}} item={item} />
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
    paddingStart: 8,
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  titleStyle: {
    width: '76%',
  },
  iconMargin: {
    marginRight: 4,
  },
});
export default FeedDetails;
