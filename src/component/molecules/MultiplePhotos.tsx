import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomImage from '../atom/CustomImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextComponent from '../atom/CustomText';

interface MultiplePhotosProps {
  photo: string;
  onDeletePhoto: (index: number | string) => void;
}

const MultiplePhotos: React.FC<MultiplePhotosProps> = ({
  photo,
  onDeletePhoto,
}) => {
  return (
    <View style={styles.photoContainer}>
      <CustomImage image={photo} style={styles.photo} />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeletePhoto(photo)}>
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    margin: 8,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'red',
    borderRadius: 16,
    padding: 4,
  },
});

export default MultiplePhotos;
