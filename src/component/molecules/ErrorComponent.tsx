import React from 'react';

import {View, Image, StyleSheet} from 'react-native';
import TextComponent from '../atom/CustomText';
import {user3x} from '../../assets/images';

interface ErrorComponentProps {
  title: string;
  description: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.error}>
      <Image source={user3x} style={styles.icon} />
      <TextComponent style={styles.title}>{title}</TextComponent>
      <TextComponent style={styles.description}>{description}</TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ErrorComponent;
