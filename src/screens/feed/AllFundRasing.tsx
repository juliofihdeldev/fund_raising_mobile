import React from 'react';
import {FlatList, View, SafeAreaView, ScrollView} from 'react-native';
import {GlobalStyles} from './GlobalStyle';
import {useFunding} from '../../context/FundingContext';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import CustomView from '../../component/atom/CustomView';

type AllScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: AllScreenNavigationProp;
}

const AllFundraising: React.FC<Props> = ({navigation, route}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {category} = route.params;
  const {fundraising, handleGetFundraising} = useFunding();

  navigation.setOptions({
    title: category as string,
  });

  React.useEffect(() => {
    handleGetFundraising();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <FlatList
        data={
          category === 'All Categories'
            ? fundraising?.filter(project => project.status === 'Active')
            : fundraising?.filter(project =>
                category !== 'Emergency'
                  ? project.category === category && project.status === 'Active'
                  : project.is_emergency === true &&
                    project.status === 'Active',
              )
        }
        renderItem={project => (
          <View style={GlobalStyles.projectItem}>
            <ItemDonationVertical
              project={project}
              onPress={() => {
                navigation.navigate('FeedDetails', {
                  project: project?.item,
                });
              }}
            />
          </View>
        )}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={GlobalStyles.container}
      />
    </SafeAreaView>
  );
};

export default AllFundraising;
