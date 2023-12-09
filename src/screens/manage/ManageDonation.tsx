import React from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';

import {GlobalStyles} from '../feed/GlobalStyle';

import TextComponent from '../../component/atom/CustomText';
import UserDonation from '../../component/UserDonation';
import {useFunding} from '../../context/FundingContext';
import {currency} from '../../utils/currency';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import {useLang} from '../../context/LanguageContext';
import {FlashList} from '@shopify/flash-list';

type FeedDetailsScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
}

const ManageDonation: React.FC<Props> = () => {
  const {lang} = useLang();

  const {donations} = useFunding();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.containerDetailsItem}>
        <View style={GlobalStyles.projectContainerDetails}>
          <View style={GlobalStyles.contentText}>
            <View>
              <TextComponent
                style={[
                  GlobalStyles.goalTextBold,
                  {
                    marginTop: 12,
                    fontSize: 21,
                  },
                ]}
                numberOfLines={2}>
                Tu as collecté{' '}
                {donations.length &&
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
                    GlobalStyles.goalTextBold,
                    {
                      marginTop: 12,
                      fontSize: 15,
                    },
                  ]}>
                  {donations?.length
                    ? `${donations.length} ${lang?.already_make_donation}`
                    : lang?.no_collect}
                </TextComponent>

                <FlashList
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
                  contentContainerStyle={GlobalStyles.container}
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
