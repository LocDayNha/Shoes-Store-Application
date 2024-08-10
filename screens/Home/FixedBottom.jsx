import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FixedBottom = ({ children }) => {
  return (
    <View style={styles.container}>
      {children && React.cloneElement(children, { style: styles.btn })}
    </View>
  );
};

export default FixedBottom;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingHorizontal: 20,
    justifyContent: 'center',
    left: 0,
    right: 0,
  },

  btn: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  },
});
