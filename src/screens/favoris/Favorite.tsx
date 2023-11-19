import React, {useEffect} from 'react';
import {View, SafeAreaView, ScrollView, FlatList, Text} from 'react-native';

import {useAuth} from '../../context/AuthContext';
import ItemDonationUser from '../../component/ItemDonationUser';
import {useFunding} from '../../context/FundingContext';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {Root} from 'react-native-alert-notification';
import CustomHeader from '../../component/CustomHeader';
import TextComponent from '../../component/atom/CustomText';
import {Color} from '../../assets/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '../../navigations/MainNavigation';
import { useLang } from '../../context/LanguageContext';
import { feedStyles } from '../feed/GlobalStyle';

type FavoriteScreenNavigationProp = StackNavigationProp<FeedStackParamList, 'FeedDetails'>;

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
  },[user?.id]);


  const goToSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <Root>
      <SafeAreaView
        style={{
          backgroundColor: Color.white,
          flex: 1,
        }}>
        <CustomHeader
          placeholder="Recherche"
          navigation={navigation}
          goToSearch={goToSearch}
        />
        <ScrollView>
        
          <ScrollView horizontal={true}>
            <FlatList
              horizontal={true}
              data={donationsUser.map((el) => {
                return {
                  ...el,
                  id: el.project_id,
                };
              })}
              renderItem={funding => (
                <View
                  style={[feedStyles.projectItemVertical, {marginRight: 26}]}>
                  <ItemDonationUser
                    funding={funding}
                    onPress={() => {
                      navigation.navigate('FeedDetails', {
                        project: funding?.item
                      });
                    }}
                  />
                </View>
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={feedStyles.container}
            />
          </ScrollView>

          {fundraising.filter(item => item.is_emergency)?.length > 0 && (
            <ScrollView>
              <TextComponent
                fontSize={17}
                fontFamily='Montserrat-Bold'
                style={{
                  color: Color.black,
                  marginLeft: 16,
                  marginTop: 16,
                }}>
                {lang?.urgence}
              </TextComponent>

              <FlatList
                horizontal={false}
                data={fundraising.filter(
                  item => item.is_emergency && item.status === 'Active',
                )}
                renderItem={funding => (
                  <View style={feedStyles.projectItem}>
                    <ItemDonationVertical
                      project={funding}
                      onPress={() => {
                        navigation.navigate('FeedDetails', {
                          project: funding?.item,
                        });
                      }}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={feedStyles.container}
              />
            </ScrollView>
          )}
        </ScrollView>
      </SafeAreaView>
    </Root>
  );
};

export default Favorite;
