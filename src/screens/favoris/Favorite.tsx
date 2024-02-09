import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView as ReactScrollView,
  Animated,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import ItemDonationUser from '../../component/ItemDonationUser';
import {useFunding} from '../../context/FundingContext';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {Root} from 'react-native-alert-notification';
import TextComponent from '../../component/atom/CustomText';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import {useLang} from '../../context/LanguageContext';
import {GlobalStyles} from '../feed/GlobalStyle';
import {ScrollView} from 'react-native-virtualized-view';

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

  return (
    <Root>
      <SafeAreaView style={GlobalStyles.container}>
        <View style={{padding: 12}}>
          <ScrollView
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            <TextComponent fontSize={21} fontWeight="bold">
              Your Donnations
            </TextComponent>

            <ReactScrollView alwaysBounceHorizontal={true}>
              <FlatList
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
                keyExtractor={item => item?.id?.toString()}
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

                <FlatList
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
                  keyExtractor={item => item?.id?.toString()}
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
