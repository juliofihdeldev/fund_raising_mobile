import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';

import { feedStyles } from '../feed/GlobalStyle';

import TextComponent from '../../component/atom/CustomText';
import UserDonation from '../../component/UserDonation';
import {useFunding} from '../../context/FundingContext';
import {currency} from '../../utils/currency';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '../../navigations/MainNavigation';
import { useLang } from '../../context/LanguageContext';

type FeedDetailsScreenNavigationProp = StackNavigationProp<FeedStackParamList, 'FeedDetails'>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
}

const ManageDonation: React.FC<Props> = ({route, navigation}) => {
  const {lang} = useLang()
  
  const {
    donations,
  } = useFunding();

  return (
    <SafeAreaView style={feedStyles.container}>
      <View style={feedStyles.containerDetailsItem}>
        <View style={feedStyles.projectContainerDetails}>
          <View style={feedStyles.contentText}>
            <View>
              <TextComponent
                style={[
                  feedStyles.goalTextBold,
                  {
                    marginTop: 12,
                    fontSize: 21,
                  },
                ]}
                numberOfLines={2}>
                    Tu as collecté {donations.length &&
                      currency(
                        donations
                          .reduce((a, b) => a + (b.amount || 0), 0)
                          ?.toFixed(2),
                      )}
              </TextComponent>

              <View
                style={{
                  backgroundColor: 'transparent',
                }}>
                <TextComponent
                  style={[
                    feedStyles.goalTextBold,
                    {
                      marginTop: 12,
                      fontSize: 15,
                    },
                  ]}>
                  {donations?.length
                    ? `${donations.length} ${lang?.already_make_donation}`
                    :lang?.no_collect }
                </TextComponent>

                <FlatList
                  horizontal={false}
                  data={donations}
                  renderItem={({item}) => (
                    <UserDonation
                      onPress={() => {}}
                      image={item?.image}
                      name={item?.user_name}
                      amount={item?.amount}
                      item={item}
                      
                    />
                  )}
                  keyExtractor={item => item.id}
                  contentContainerStyle={feedStyles.container}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageDonation;

