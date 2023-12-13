import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView as ReactScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import ItemDonationUser from '../../component/ItemDonationUser';
import {useFunding} from '../../context/FundingContext';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {Root} from 'react-native-alert-notification';
import CustomHeader from '../../component/CustomHeader';
import TextComponent from '../../component/atom/CustomText';

import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import {useLang} from '../../context/LanguageContext';
import {GlobalStyles} from '../feed/GlobalStyle';
import {ScrollView} from 'react-native-virtualized-view';
import {FlashList} from '@shopify/flash-list';

type FavoriteScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: FavoriteScreenNavigationProp;
}

const Favorite: React.FC<Props> = ({navigation}) => {
  const {fundraising, donationsUser, handleGetDonationsByUserId} = useFunding();
  const {user} = useAuth();
  const {lang} = useLang();

  useEffect(() => {
    if (user) {
      handleGetDonationsByUserId(user?.id!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 124);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 124],
    outputRange: [0, -124],
  });

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
          <CustomHeader />
        </Animated.View>
        <View>
          <ScrollView
            style={{marginTop: 86}}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            <TextComponent
              fontSize={21}
              fontWeight="bold"
              style={{marginBottom: 12}}>
              Your Donnations
            </TextComponent>

            <ReactScrollView alwaysBounceHorizontal={true}>
              <FlashList
                horizontal={true}
                data={donationsUser.map(el => {
                  return {
                    ...el,
                    id: el.project_id,
                  };
                })}
                renderItem={funding => (
                  <View style={[{marginRight: 26}]}>
                    <ItemDonationUser
                      funding={funding as any}
                      onPress={() => {
                        navigation.navigate('FeedDetails', {
                          project: funding.item,
                        });
                      }}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={GlobalStyles.container}
              />
            </ReactScrollView>

            {fundraising.filter(item => item?.is_emergency)?.length > 0 && (
              <ReactScrollView>
                <TextComponent
                  fontSize={21}
                  fontFamily="Montserrat-Bold"
                  style={{
                    marginLeft: 4,
                    marginTop: 16,
                  }}>
                  {lang?.urgence}
                </TextComponent>

                <FlashList
                  estimatedItemSize={300}
                  data={fundraising.filter(
                    item => item.is_emergency && item.status === 'Active',
                  )}
                  renderItem={funding => (
                    <View style={[GlobalStyles.projectItem, {marginRight: 24}]}>
                      <ItemDonationVertical
                        project={funding as any}
                        onPress={() => {
                          navigation.navigate('FeedDetails', {
                            project: funding?.item,
                          });
                        }}
                      />
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  contentContainerStyle={GlobalStyles.container}
                />
              </ReactScrollView>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Root>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    zIndex: 1,

    width: '100%',
    justifyContent: 'space-between',
  },
});
export default Favorite;
