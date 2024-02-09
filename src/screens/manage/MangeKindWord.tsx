import React from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {GlobalStyles} from '../feed/GlobalStyle';

import TextComponent from '../../component/atom/CustomText';
import UserCommentItem from '../../component/UserCommentItem';
import {useFunding} from '../../context/FundingContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import {useLang} from '../../context/LanguageContext';

type FeedDetailsScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
}

const MangeKindWord: React.FC<Props> = ({route, navigation}) => {
  const {lang} = useLang();

  const {messages} = useFunding();

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
                    fontSize: 17,
                  },
                ]}
                numberOfLines={2}>
                {lang?.word_support} ({messages?.length})
              </TextComponent>

              <FlatList
                horizontal={false}
                data={messages}
                renderItem={({item}) => <UserCommentItem item={item} />}
                keyExtractor={item => item?.id?.toString()}
                contentContainerStyle={GlobalStyles.container}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MangeKindWord;
