import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {ProjectType} from '../../types/Index';
import SearchBar from '../../component/SearchBar';
import {GlobalStyles} from './GlobalStyle';
import {useFunding} from '../../context/FundingContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import TextComponent from '../../component/atom/CustomText';
import CustomView from '../../component/atom/CustomView';
import {FlashList} from '@shopify/flash-list';

type SearchScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: SearchScreenNavigationProp;
}

const Search: React.FC<Props> = ({navigation}) => {
  const {fundraising, handleGetFundraising} = useFunding();
  const scrollRef = React.useRef<ScrollView>(null);

  navigation.setOptions({
    headerShown: false,
  });

  React.useEffect(() => {
    handleGetFundraising();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const [searchValue, setValue] = React.useState('');
  const [filtered, setFiltered] = React.useState<ProjectType[]>([]);

  const handleSearch = () => {
    if (searchValue.length < 2) {
      setFiltered([]);
      return;
    }
    const filtered = fundraising.filter(
      el =>
        el?.name?.toLowerCase().includes(searchValue.toLowerCase()) &&
        el.status === 'Active',
    );
    setFiltered(filtered);
  };

  const onChangeText = (text: string) => {
    setValue(text);
    setTimeout(() => {
      handleSearch();
    }, 500);
  };

  const clearSearch = () => {
    setValue('');
    setFiltered([]);
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.searchContainer}>
        <View style={styles.searchContainer} />
        <SearchBar
          placeholder="Search"
          onChangeText={onChangeText}
          goBack={goBack}
          focus={true}
        />
        {searchValue && (
          <Ionicons
            name="close-outline"
            size={20}
            color="#333"
            style={styles.iconStyle}
            onPress={clearSearch}
          />
        )}
        {searchValue && (
          <Ionicons
            name="search-outline"
            size={20}
            color="#333"
            style={styles.iconStyle}
            onPress={handleSearch}
          />
        )}
      </View>

      <ScrollView ref={scrollRef}>
        <CustomView style={styles.container}>
          <TextComponent
            style={styles.textStyle}
            fontSize={14}
            fontWeight="bold">
            Result for {searchValue}
          </TextComponent>
          <FlashList
            data={filtered}
            renderItem={project => (
              <View style={styles.projectItemVertical}>
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
            keyExtractor={item => item.id}
            contentContainerStyle={GlobalStyles.container}
          />
        </CustomView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  projectItemVertical: {
    marginTop: 32,
  },
  container: {
    alignItems: 'flex-start',
    marginLeft: 8,
    marginRight: 8,
  },
  searchContainer: {
    marginTop: 82,
  },

  iconStyle: {
    marginLeft: 16,
    fontSize: 32,
  },
  textStyle: {
    fontSize: 18,
  },
});

export default Search;
