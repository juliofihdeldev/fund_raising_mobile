import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';

import {Color} from '../../assets/GlobalStyles';
import {useFunding} from '../../context/FundingContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import Category from '../../component/Category';
import ManageDonation from './ManageDonation';
import ManageDetail from './ManageDetail';
import MangeKindWord from './MangeKindWord';
import {GlobalStyles} from '../feed/GlobalStyle';
import ManageMoncashWithLoading from './ManageMoncash';

const menu_option = [
  {
    id: 'detail',
    name: 'Details',
    icon: 'grid-outline',
  },
  {
    id: 'donation',
    name: 'Donation',
    icon: 'wallet-outline',
  },
  {
    id: 'kind_word',
    name: 'Kind words',
    icon: 'text-outline',
  },
  {
    id: 'moncash',
    name: 'Moncash',
    icon: 'wallet-outline',
  },
];

type FeedDetailsScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
}

const ManageFundrasing: React.FC<Props> = ({route, navigation}) => {
  const [category, setCategory] = React.useState(menu_option[0]);

  const {handleGetDonations, handleGetProjectByID, handleGetMessagesByID} =
    useFunding();

  const {project} = route?.params;
  const {id} = project;

  React.useEffect(() => {
    async function fetchDonations() {
      Promise.all([
        await handleGetDonations(id),
        await handleGetMessagesByID(id),
      ]);
    }
    fetchDonations();
  }, [id]);

  React.useEffect(() => {
    async function fetchFundRasing() {
      await handleGetProjectByID(id);
    }
    fetchFundRasing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, route]);

  const handleCaterogy = (cat: any) => {
    setCategory(cat);
  };

  navigation.setOptions({
    headerTitle: 'Manage Fundraising',
  });

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.categoryContainer}>
        {menu_option.map((cat, index) => (
          <Category
            key={index}
            iconName={cat.icon}
            title={cat.name}
            iconSize={32}
            onPress={() => {
              handleCaterogy(cat);
            }}
            style={[
              GlobalStyles.category,
              {
                backgroundColor:
                  cat.id == category.id ? Color.primary : Color.secondaryLight,
              },
            ]}
            color={Color.white}
            styleContainer={[GlobalStyles.styleContainer]}
          />
        ))}
      </View>
      <ScrollView>
        {category.id === 'detail' && <ManageDetail navigation={navigation} />}
        {category.id === 'donation' && (
          <ManageDonation navigation={navigation} />
        )}
        {category.id === 'kind_word' && (
          <MangeKindWord navigation={navigation} />
        )}
        {category.id === 'moncash' && (
          <ManageMoncashWithLoading navigation={navigation} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageFundrasing;
