import React, {useEffect} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import SearchBar from '../component/SearchBar';
import ItemDonation from '../component/ItemDonation';
import Category from '../component/Category';
import ItemDonationVertical from '../component/ItemDonationVertical';
import CustomButton from '../component/atom/CustomButton';
import ItemUser from '../component/ItemUser';
import {user3x} from '../assets/images';
import UserCommentItem from '../component/UserCommentItem';
import firestore from '@react-native-firebase/firestore';

const Build = () => {
  useEffect(() => {
    // Your code goes here
    const fetchData = async () => {
      // get all users for firestore
      try {
        const result = await firestore().collection('users').get();
      } catch (error) {
        console.log('error error error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Category
        onPress={() => {}}
        iconName="grid-outline"
        iconSize={24}
        styleContainer={styles.styleContainer}
        title="Category"
        style={styles.category}
      />

      <SearchBar placeholder="Search" />
      <ItemDonationVertical onPress={() => {}} />

      <UserCommentItem
        onPress={() => {}}
        amount={150}
        name="@JUlio"
        comment="Lorem ipsum dolor sit amet consectetur elit. Lorem ipsum dolor sit amet consectetur elit. Lorem ipsum dolor sit amet consectetur elit."
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  category: {
    width: 60,
    height: 60,
  },
  styleContainer: {
    marginTop: 16,
  },
});

export default Build;
