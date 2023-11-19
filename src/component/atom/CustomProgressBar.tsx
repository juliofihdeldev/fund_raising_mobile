import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import { Color } from '../../assets/GlobalStyles';

interface CustomProgressBarProps {
  value: number;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({value}) => {
  return (
    <TouchableOpacity style={styles.containerBar}>
      <TouchableOpacity style={[{width: `${value}%`}, styles.containerValue]}>
        <Text />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerBar: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 18,
    marginTop: 8,
    height: 5,
  },
  containerValue: {
    backgroundColor: Color.primary,
    borderRadius: 18,
    justifyContent: 'center',
  },
});
export default CustomProgressBar;
