import React from 'react';
import {FlatList, View, Text, SafeAreaView, } from 'react-native';
import {ProjectType} from '../../types/Index';
import {projects} from '../../mock/feeds';
import SearchBar from '../../component/SearchBar';
import NotificationIcon from '../../component/atom/NotificationIcon';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {GlobalStyles} from './GlobalStyle';
import { ScrollView } from 'react-native-virtualized-view'

const Favorite: React.FC<ProjectType> = () => {
  const renderProject: React.FC<{item: ProjectType}> = () => (
    <View style={GlobalStyles.projectItem}>
      <ItemDonationVertical onPress={() => {}} />
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.searchContainer}>
        <SearchBar placeholder="Search" />
        <NotificationIcon count={3} style={GlobalStyles.notificationIcon} />
      </View>

      <ScrollView>
        <View style={GlobalStyles.forestContainer}>
          <Text style={GlobalStyles.projectTitle}> Your wish list </Text>
          <FlatList
            horizontal={false}
            data={projects as ProjectType[]}
            renderItem={renderProject}
            keyExtractor={item => item.id}
            contentContainerStyle={GlobalStyles.container}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorite;
