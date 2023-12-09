import React, {useCallback} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Share,
} from 'react-native';
import {Root} from 'react-native-alert-notification';
import {DonationType, ProjectType} from '../../types/Index';
import {GlobalStyles} from './GlobalStyle';
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

import withLoadingFresh from '../../component/HOC/RefreshLoading';
import ManageOption from '../manage/ManageOptions';
import {useAuth} from '../../context/AuthContext';
import {FlashList} from '@shopify/flash-list';

const FeedDetails: React.FC<ProjectType> = ({
  route,
  navigation,
  setLoading,
}: any) => {
  const [readMore, setReadMore] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const {user} = useAuth();
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const {id} = route?.params?.project;

  const {
    projects,
    donations,
    messages,
    handleGetMessagesByID,
    handleGetProjectByID,
    handleGetDonations,
  } = useFunding();

  const {
    name = '',
    amount,
    collect,
    date,
    image,
    description,
    category,
    view_count = 0,
  } = projects;

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        await Promise.all([
          handleGetProjectByID(id),
          handleGetMessagesByID(id),
          handleGetDonations(id),
        ]);
      }
      fetchData();
    }, [id]),
  );

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

  const sharedFundraising = () => {
    Share.share({
      message: `Pote kole: ${description} ${currency(amount)}  
https://pote-kole.web.app?id=${id}`,
    });
  };

  return (
    <Root>
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
          <TextComponent
            color="#000"
            numberOfLines={3}
            style={styles.titleStyle}>
            {projects?.user?.name} has raised {currency(collect)} of{' '}
            {currency(amount)} goal • {donations?.length} donations
          </TextComponent>

          {user?.id === projects?.user?.id && (
            <Ionicons
              name="menu-outline"
              size={28}
              color={Color.primary}
              onPress={handleMenu}
            />
          )}
        </Animated.View>

        {showMenu && (
          <ManageOption
            navigation={navigation}
            projects={projects}
            onClose={() => setShowMenu(false)}
          />
        )}

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

                  <View
                    style={[GlobalStyles.contentTextPrice, {marginTop: 12}]}>
                    <TextComponent numberOfLines={2}>
                      {projects?.user?.name} has raised {currency(collect)} of{' '}
                      {currency(amount)} goal • {donations?.length} donations
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
                    onPress={() => sharedFundraising()}
                    buttonStyle={styles.shareButtonStyle}
                  />

                  <View style={styles.containerItemStyle}>
                    <ItemUser
                      item={projects?.user}
                      onPress={() => {}}
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

                    <FlashList
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

                  <FlashList
                    horizontal={false}
                    data={messages as any}
                    renderItem={({item}) => <UserCommentItem item={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={GlobalStyles.container}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Root>
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

const FeedDetailsWithLoading = withLoadingFresh(FeedDetails, 'Please wait...');

export default FeedDetailsWithLoading;
