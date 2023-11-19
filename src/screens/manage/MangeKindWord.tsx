import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';
import { feedStyles } from '../feed/GlobalStyle';

import TextComponent from '../../component/atom/CustomText';
import UserCommentItem from '../../component/UserCommentItem';
import {useFunding} from '../../context/FundingContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '../../navigations/MainNavigation';
import { useLang } from '../../context/LanguageContext';


type FeedDetailsScreenNavigationProp = StackNavigationProp<FeedStackParamList, 'FeedDetails'>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
}

const MangeKindWord: React.FC<Props> = ({route, navigation}) => {
  const {lang} = useLang()
  
  const {
    messages,
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
                    fontSize: 17,
                  },
                ]}
                numberOfLines={2}>
                {lang?.word_support} ({messages?.length})
              </TextComponent>

              <FlatList
                horizontal={false}
                data={messages }
                renderItem={({item}) => (
                  <UserCommentItem
                    onPress={() => {}}
                    amount={item.amount_donation}
                    name={item?.sender?.name}
                    comment={item?.message}
                    image={item?.sender?.image}
                  />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={feedStyles.container}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MangeKindWord;
