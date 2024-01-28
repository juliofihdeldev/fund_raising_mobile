import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface SearchBarProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  goBack?: () => void;
  focus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChangeText,
  focus = true,
}) => {
  return (
    <View style={styles.container}>
      {/* <Ionicons
        name="search"
        size={20}
        color="#333"
        style={styles.icon}
        onPress={goBack}
      /> */}
      <TextInput
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        autoFocus={focus}
        keyboardType="default"
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
