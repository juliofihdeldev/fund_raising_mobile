import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import SearchBar from '../component/SearchBar';
import firestore from '@react-native-firebase/firestore';

const Build = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await firestore().collection('users').get();
      } catch (error) {
        console.log('error error error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SearchBar placeholder="Search" />
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
