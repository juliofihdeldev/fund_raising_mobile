import React, {useState, useEffect} from 'react';
import {Dimensions, TextInput, StyleSheet, TextInputProps} from 'react-native';

interface TextAreaInputProps extends TextInputProps {}

const TextAreaInput: React.FC<TextAreaInputProps> = props => {
  const minHeight = 42;
  const [height, setHeight] = useState(minHeight);

  useEffect(() => {
    if (props.value) {
      setHeight(Math.max(minHeight, height));
    }
  }, [props.value]);

  const onContentSizeChange = (e: any) => {
    const contentHeight = e.nativeEvent.contentSize.height;
    setHeight(Math.max(minHeight, contentHeight));
  };

  return (
    <TextInput
      testID="textAreaInput"
      {...props}
      style={[styles.input, {height}, props.style]}
      multiline={true}
      onContentSizeChange={onContentSizeChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: Dimensions.get('window').width - 64,
    paddingHorizontal: 12,
    marginLeft: 8,
    fontWeight: 'normal',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
});

export default TextAreaInput;
