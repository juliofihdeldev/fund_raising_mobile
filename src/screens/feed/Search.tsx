import React from 'react';
import {FlatList, View, Text, SafeAreaView, ScrollView} from 'react-native';
import {ProjectType} from '../../types/Index';
import SearchBar from '../../component/SearchBar';
import {feedStyles} from './GlobalStyle';
import {useFunding} from '../../context/FundingContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '../../navigations/MainNavigation';
import TextComponent from '../../component/atom/CustomText';

type SearchScreenNavigationProp = StackNavigationProp<FeedStackParamList, 'FeedDetails'>;

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
    <SafeAreaView style={feedStyles.container}>
      <View style={feedStyles.searchContainer}>
        <View 
          style={{
            marginTop: 82
          }}
        />
        <SearchBar
          placeholder="Search"
          value={searchValue}
          onChangeText={onChangeText}
          onPress={goBack}
          
        />
        {searchValue && (
          <Ionicons
            name="close-circle-outline"
            size={20}
            color="#333"
            style={{
              marginLeft: 8,
            }}
            onPress={clearSearch}
          />
        )}
      </View>

      <ScrollView ref={scrollRef}>
        <View style={feedStyles.forestContainer}>
          <TextComponent
            style={{
              fontSize: 15,
              marginLeft: 8,
              marginTop: 12,
            }}>
            {' '}
             Result for {searchValue}
          </TextComponent>
          <FlatList
            data={filtered }
            renderItem={project => (
              <View style={feedStyles.projectItemVertical}>
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
            contentContainerStyle={feedStyles.container}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
